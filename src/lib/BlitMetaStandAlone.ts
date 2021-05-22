import { ReadBuffer } from "./ReadBuffer";

export class BlitImage {

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
    readonly category: string,
    readonly url: string
  ) {
  }

  static async parse(readBuffer: ReadBuffer, size: number): Promise<BlitMetaStandalone> {
    const checksum = await readBuffer.readUint32(); //4
    const date = await readBuffer.readString(16); //20
    const title = await readBuffer.readString(25); // 45
    const description = await readBuffer.readString(129); // 174
    const version = await readBuffer.readString(17); // 191
    const author = await readBuffer.readString(17); // 208
    const blitType = await readBuffer.readString(8); // 216
    const category = await readBuffer.readString(17); // 233
    const url = await readBuffer.readString(129); // 362
    await readBuffer.read(size - 362);

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
    );
  }
}
