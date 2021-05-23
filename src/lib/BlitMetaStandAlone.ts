import {RandomAccessReader} from './RandomAccessReader';

export class BlitImage {
  constructor(
    readonly type: string,
    readonly dataLength: number,
    readonly width: number,
    readonly height: number,
    readonly format: number,
    readonly pallete: ArrayBuffer,
    readonly pixels: ArrayBuffer,
  ) {

  }

  static parse(reader: RandomAccessReader): BlitImage {
    const header = reader.readString(6);
    if (header !== 'SPRITE') {
      throw new Error(`Invalid header for BlitImage: ${header}`);
    }
    const type = reader.readString(2);

    const dataLength = reader.readUint32(true);
    const width = reader.readUint16(true);
    const height = reader.readUint16(true);
    const format = reader.readUint8();
    const palleteLength = reader.readUint8();
    const pallete = reader.read(palleteLength * 4);
    const pixels = reader.read(dataLength - 18 - palleteLength * 4);
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

  static parse(buffer: ArrayBuffer): BlitMetaStandalone {
    const reader = new RandomAccessReader(buffer);

    const checksum = reader.readUint32(true);
    const date = reader.readString(16);
    const title = reader.readString(25);
    const description = reader.readString(129);
    const version = reader.readString(17);
    const author = reader.readString(17);

    let category;
    let url;
    let filetypes;

    const pos = reader.getPos();
    const blitType = reader.readString(8);
    if (blitType === 'BLITTYPE') {
      category = reader.readString(17);
      url = reader.readString(129);
      const filetypesLength = reader.readUint8();

      filetypes = [];
      for (let i = 0; i < filetypesLength; i++) {
        filetypes.push(reader.readString(5));
      }
    } else {
      reader.setPos(pos);
    }

    const icon = BlitImage.parse(reader);
    const splash = BlitImage.parse(reader);

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
