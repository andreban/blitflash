import {ReadBuffer} from './ReadBuffer';

export class BlitImage {
  constructor(
    readonly type: string,
    readonly dataLength: number,
    readonly width: number,
    readonly height: number,
    readonly format: number,
    readonly pallete: Uint8Array,
    readonly pixels: Uint8Array,
  ) {

  }

  static async parse(readBuffer: ReadBuffer): Promise<BlitImage> {
    const header = await readBuffer.readString(6);
    if (header !== 'SPRITE') {
      throw new Error(`Invalid header for BlitImage: ${header}`);
    }
    const type = await readBuffer.readString(2);

    const dataLength = await readBuffer.readUint32(true);
    const width = await readBuffer.readUint16(true);
    const height = await readBuffer.readUint16(true);
    const format = await readBuffer.readUint8();
    const palleteLength = await readBuffer.readUint8();
    const pallete = await readBuffer.read(palleteLength * 4);
    const pixels = await readBuffer.read(dataLength - 18 - palleteLength * 4);
    return new BlitImage(type, dataLength, width, height, format, pallete, pixels);
  }
}

/**
 * As defined at
 * https://github.com/32blit/32blit-tools/blob/a520a742450c8da97f88f6c0ce74ac0038093e02/src/ttblit/core/struct.py#L79
 */
export class BlitMetaStandalone {
  constructor(
    readonly checksum: number,
    readonly date: string,
    readonly title: string,
    readonly description: string,
    readonly version: string,
    readonly author: string,
    readonly blittype: string,
    readonly category?: string,
    readonly url?: string,
    readonly filetypes?: string[],
    readonly icon?: BlitImage,
    readonly splash?: BlitImage,
  ) {
  }

  static async parse(readBuffer: ReadBuffer, size: number): Promise<BlitMetaStandalone> {
    const checksum = await readBuffer.readUint32(true); //4
    const date = await readBuffer.readString(16); //20
    const title = await readBuffer.readString(25); // 45
    const description = await readBuffer.readString(129); // 174
    const version = await readBuffer.readString(17); // 191
    const author = await readBuffer.readString(17); // 208
    const blitType = await readBuffer.readString(8); // 216
    if (blitType !== 'BLITTYPE') {
      await readBuffer.read(size - 216);
      return new BlitMetaStandalone(checksum, date, title, description, version, author, blitType);
    }
    const category = await readBuffer.readString(17); // 233
    const url = await readBuffer.readString(129); // 362
    const filetypesLength = await readBuffer.readUint8(); //363
    const filetypes: string[] = [];
    for (let i = 0; i < filetypesLength; i++) {
      filetypes.push(await readBuffer.readString(5));
    }

    const icon = await BlitImage.parse(readBuffer);
    const splash = await BlitImage.parse(readBuffer);

    return new BlitMetaStandalone(
      checksum,
      date,
      title,
      description,
      version,
      author,
      blitType,
      category,
      url,
      filetypes,
      icon,
      splash,
    );
  }
}
