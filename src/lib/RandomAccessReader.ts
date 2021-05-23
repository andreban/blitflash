export class RandomAccessReader {
  private textdecoder = new TextDecoder();
  private dataview;
  private currentPos = 0;

  constructor(private buffer: ArrayBufferLike) {
    this.dataview = new DataView(buffer);
  }

  read(length: number): ArrayBuffer {
    if (this.currentPos + length > this.dataview.byteLength) {
      throw new Error(`Tried to read beyond length. pos: ${this.currentPos}, buffer byteLength: ${this.dataview.byteLength}, length: ${length} `);
    }
    const result = this.buffer.slice(this.currentPos, this.currentPos + length);
    this.currentPos += length;
    return result;
  }

  readUint8(): number {
    if (this.currentPos + 1 >= this.dataview.byteLength) {
      throw new Error('Tried to read beyond length.');
    }
    const value = this.dataview.getUint8(this.currentPos);
    this.currentPos += 1;
    return value;
  }

  readUint16(littleEndian?: boolean): number {
    if (this.currentPos + 2 >= this.dataview.byteLength) {
      throw new Error('Tried to read beyond length.');
    }
    const value = this.dataview.getUint16(this.currentPos, littleEndian);
    this.currentPos += 2;
    return value;
  }

  readUint32(littleEndian?: boolean): number {
    if (this.currentPos + 4 >= this.dataview.byteLength) {
      throw new Error('Tried to read beyond length.');
    }
    const value = this.dataview.getUint32(this.currentPos, littleEndian);
    this.currentPos += 4;
    return value;
  }

  readString(length: number): string {
    const data = new Uint8Array(this.read(length));
    let end = data.findIndex((value) => value === 0);
    if (end === -1) {
      end = length - 1;
    }
    return this.textdecoder.decode(data.slice(0, end + 1));
  }

  getPos(): number {
    return this.currentPos;
  }

  setPos(newPos: number): void {
    if (newPos >= this.dataview.byteLength) {
      throw new Error('Cant set position beyond length.');
    }
    this.currentPos = newPos;
  }

  byteLength(): number {
    return this.dataview.byteLength;
  }
}
