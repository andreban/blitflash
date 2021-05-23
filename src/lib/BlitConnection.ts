import {BlitMetaStandalone} from './BlitMetaStandAlone';
import {ReadBuffer} from './ReadBuffer';

export type BlitRecord = {
  offset: number;
  size: number;
  meta?: BlitMetaStandalone;
}

export class BlitConnection {
  private encoder = new TextEncoder();
  private decoder = new TextDecoder();
  private readBuffer = new ReadBuffer();

  constructor(private reader: ReadableStreamDefaultReader<Uint8Array>,
      private writer: WritableStreamDefaultWriter<Uint8Array>) {
    this.readLoop();
  }

  private async readLoop() {
    while (true) {
      const {value, done} = await this.reader.read();
        if (value) {
          // console.log('>>>', this.decoder.decode(value));
          this.readBuffer.append(value);
        }
        if (done) {
          this.reader.releaseLock();
          this.readBuffer.failPendingPromises(new Error('ReadableStream is done.'));
          break;
        }
    }
  }

  private async write(payload: string): Promise<void> {
    const encoded = this.encoder.encode(payload);
    await this.writer.write(encoded);
  }

  async close(): Promise<void> {
    await this.writer.close();
    await this.reader.cancel();
  }

  async reset(): Promise<void> {
    await this.write('32BL_RST\0');
    await this.writer.ready;
  }

  async status(): Promise<string> {
    await this.write('32BLINFO\0');
    const result = await this.readBuffer.read(8);
    return this.decoder.decode(result);
  }

  async list(): Promise<BlitRecord[]> {
    const records: BlitRecord[] = [];
    await this.write('32BL__LS\0');
    let offset = await this.readBuffer.readUint32(true);
    while (offset !== 0xFFFFFFFF) {
      let size = await this.readBuffer.readUint32(true);

      const metaHead = this.decoder.decode(await this.readBuffer.read(8));
      if (metaHead !== 'BLITMETA') {
        throw new Error(`Incorret meta header. Received ${metaHead}`);
      }
      const metaSize = await this.readBuffer.readUint16(true);

      let meta: BlitMetaStandalone | undefined;
      if (metaSize > 0) {
        size = size + metaSize + 10;
        meta = BlitMetaStandalone.parse((await this.readBuffer.read(metaSize)).buffer);
      }

      records.push({
        offset: offset,
        size: size,
        meta: meta,
      });
      offset = await this.readBuffer.readUint32(true);
    }
    return records;
  }
}
