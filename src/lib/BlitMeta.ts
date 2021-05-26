import {RandomAccessReader} from './RandomAccessReader';

export class BlitImage {
  constructor(
    readonly type: string,
    readonly dataLength: number,
    readonly width: number,
    readonly height: number,
    readonly format: number,
    readonly palette: ArrayBuffer,
    readonly pixels: ArrayBuffer,
  ) {

  }

  asDataUrl(): string | null {
    const pixels = this.unpack();
    if (!pixels) {
      return null;
    }
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to create a 2d canvas context.');
      return null;
    }
    const image = ctx.createImageData(this.width, this.height);
    image.data.set(pixels);
    ctx.putImageData(image, 0, 0);
    return canvas.toDataURL();
  }

  /*
   * Copied from https://gist.github.com/Daft-Freak/f01aef0e6e3060f5b12e018d29401698
   */
  unpack(): Uint8Array | null {
    if (this.format !== 2) {
      return null;
    }

    const palette = new Uint8Array(this.palette);
    const bytes = new Uint8Array(this.pixels);
    const pixels = new Uint8Array(new ArrayBuffer(this.width * this.height * 4));

    if (this.type === 'PK') {
      const bitDepth = Math.ceil(Math.log2(palette.length / 4));
      let outOff = 0;

      let col = 0;
      let bit = 0;
      for(const byte of bytes) {
        for(let b = 0; b < 8; b++) {
          col <<= 1;
          col |= (byte>> (7 - b)) & 1;

          if(++bit == bitDepth) {
            pixels[outOff++] = palette[col * 4 + 0];
            pixels[outOff++] = palette[col * 4 + 1];
            pixels[outOff++] = palette[col * 4 + 2];
            pixels[outOff++] = palette[col * 4 + 3];
            bit = 0;
            col = 0;
          }
        }
      }
      return pixels;
    }

    if (this.type === 'RL') {
      const bitDepth = Math.ceil(Math.log2(palette.length / 4));
      let outOff = 0;

      let col = 0, bit = 0, count = 0;
      let parseState = 0;
      for(const byte of bytes) {
        for(let b = 0; b < 8; b++) {
          switch(parseState) {
            // flag
            case 0: {
              if(byte & (0x80 >> b))
                parseState = 1;
              else
                parseState = 2;
                break;
            }

            // repeat count
            case 1: {
              count <<= 1;
              count |= (byte >> (7 - b)) & 1;

              if(++bit == 8) {
                parseState = 2;
                bit = 0;
              }
              break;
            }

            // value
            case 2: {
              col <<= 1;
              col |= (byte >> (7 - b)) & 1;

              if(++bit == bitDepth) {
                for(let c = 0; c <= count; c++) {
                  pixels[outOff++] = palette[col * 4 + 0];
                  pixels[outOff++] = palette[col * 4 + 1];
                  pixels[outOff++] = palette[col * 4 + 2];
                  pixels[outOff++] = palette[col * 4 + 3];
                }
                bit = 0; col = 0; count = 0; parseState = 0;
              }
              break;
            }
          }
        }
      }
      return pixels;
    }

    return null;
  }

  numPixels(): number {
    return this.width * this.height;
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
    let paletteLength = reader.readUint8();
    // See https://github.com/32blit/32blit-tools/blob/a520a742450c8da97f88f6c0ce74ac0038093e02/src/ttblit/core/struct.py#L24-L33
    if (paletteLength === 0) {
      paletteLength = 256;
    }
    const palette = reader.read(paletteLength * 4);
    const pixels = reader.read(dataLength - 18 - paletteLength * 4);
    return new BlitImage(type, dataLength, width, height, format, palette, pixels);
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
