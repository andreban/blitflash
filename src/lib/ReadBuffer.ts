const INITIAL_CAPACITY = 1024;

type Resolver = (value: Uint8Array) => void;
type Rejecter = (error: Error) => void;

class PendingPromise {
  constructor(public dataLength: number, public resolve: Resolver, public reject: Rejecter) {
  }
}

export class ReadBuffer {
  private pendingPromises: PendingPromise[] = [];
  private buffer: Uint8Array;
  private _size = 0;
  private decoder = new TextDecoder();

  constructor(initialCapacity: number = INITIAL_CAPACITY) {
    this.buffer = new Uint8Array(new ArrayBuffer(initialCapacity));
  }

  async read(numBytes: number): Promise<Uint8Array> {
    // If we don't have any Promises pending ahead of this and have enough data we respond straight
    // away.
    if (this.pendingPromises.length === 0 && this.size() >= numBytes) {
      return await this.internalRead(numBytes);
    }

    // Otherwise, we append a Promise to our list of pending promises.
    return new Promise((resolve, reject) => {
      this.pendingPromises.push(new PendingPromise(numBytes, resolve, reject));
    });
  }

  async readUint16(littleEndian?: boolean): Promise<number> {
    const data = await this.read(2);
    return new DataView(data.buffer).getUint16(0, littleEndian);
  }

  async readUint32(littleEndian?: boolean): Promise<number> {
    const data = await this.read(4);
    return new DataView(data.buffer).getUint32(0, littleEndian);
  }

  async readString(size: number): Promise<string> {
    const data = await this.read(size);
    const zero = data.findIndex((value) => value === 0);
    return this.decoder.decode(data.slice(0, zero));
  }

  public append(data: Uint8Array): void {
    if (this.size() + data.byteLength > this.buffer.byteLength) {
      this.extendBuffer();
    }
    this.buffer.set(data, this.size());
    this._size += data.byteLength;
    this.tryResolvePendingPromises();
  }

  public failPendingPromises(error: Error): void {
    while (this.pendingPromises.length > 0) {
      this.pendingPromises.shift()!.reject(error);
    }
  }

  public size(): number {
    return this._size;
  }

  public capacity(): number {
    return this.buffer.byteLength;
  }

  /**
   * Reads `numBytes` from the internal buffer. throws an {Error} if there's not enough data in the
   * Buffer.
   *
   * @param numBytes number of bytes to read.
   * @returns A @{Promise<Uint8Array>} which resolves if the data is successfully read and rejects
   * if the buffer doesn't have enough data.
   */
  private async internalRead(numBytes: number): Promise<Uint8Array> {
    if (this.size() < numBytes) {
      throw new Error(`Internal buffer has ${this.size} bytes, but tried to read ${numBytes}.`);
    }
    this._size -= numBytes;
    const array = new Uint8Array(this.buffer.subarray(0, numBytes));
    this.buffer.copyWithin(0, numBytes, numBytes + this.size());
    return array;
  }

  private async tryResolvePendingPromises(): Promise<void> {
    while (this.pendingPromises.length > 0 && this.pendingPromises[0].dataLength <= this.size()) {
      const pendingPromise = this.pendingPromises.shift()!;
      const result = await this.internalRead(pendingPromise.dataLength);
      pendingPromise.resolve(result);
    }
  }

  private extendBuffer() {
    const newBuffer = new Uint8Array(new ArrayBuffer(this.buffer.byteLength * 2));
    newBuffer.set(this.buffer);
    this.buffer = newBuffer;
  }
}
