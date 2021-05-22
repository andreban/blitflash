import {ReadBuffer} from '../../lib/ReadBuffer';

describe('BufferedReadableStreamDefaultReader', () => {
  describe('constructor', () => {
    it('Constructs with default initial capacity', () => {
      const readBuffer = new ReadBuffer();
      expect(readBuffer.capacity()).toEqual(1024);
      expect(readBuffer.size()).toEqual(0);
    });

    it('Constructs with a custom initial capacity', () => {
      const readBuffer = new ReadBuffer(2048);
      expect(readBuffer.capacity()).toEqual(2048);
      expect(readBuffer.size()).toEqual(0);
    });
  });

  describe('append', () => {
    it('Appends data to the buffer', async () => {
      const length = 512;
      const readBuffer = new ReadBuffer();
      const data = new Uint8Array(new ArrayBuffer(length));
      await readBuffer.append(data);
      expect(readBuffer.size()).toEqual(length);
    });

    it('Appends more data to the buffer', async () => {
      const length1 = 512;
      const length2 = 123;
      const readBuffer = new ReadBuffer();
      await readBuffer.append(new Uint8Array(new ArrayBuffer(length1)));
      await readBuffer.append(new Uint8Array(new ArrayBuffer(length2)));
      expect(readBuffer.size()).toEqual(length1 + length2);
    });

    it('Fills buffer to capacity', async() => {
      const readBuffer = new ReadBuffer();
      await readBuffer.append(new Uint8Array(new ArrayBuffer(readBuffer.capacity())));
      expect(readBuffer.size()).toEqual(readBuffer.capacity());
    });

    it('Expands Buffer beyond capacity', async() => {
      const readBuffer = new ReadBuffer();
      const originalCapacity = readBuffer.capacity();
      await readBuffer.append(new Uint8Array(new ArrayBuffer(readBuffer.capacity())));
      await readBuffer.append(new Uint8Array(new ArrayBuffer(1)));
      expect(readBuffer.size()).toEqual(originalCapacity + 1);
      expect(readBuffer.capacity()).toEqual(originalCapacity * 2);
    });
  });

  describe('read', () => {
    it('Reads data correctly after append', async () => {
      const readBuffer = new ReadBuffer();
      await readBuffer.append(Uint8Array.from([0x02]));
      const result = await readBuffer.read(1);
      expect(result.byteLength).toEqual(1);
      expect(result[0]).toEqual(0x02);
    });

    it('Reads data correctly after append', async () => {
      const readBuffer = new ReadBuffer();
      const resultPromise = readBuffer.read(1);
      await readBuffer.append(Uint8Array.from([0x02]));
      const result = await resultPromise;
      expect(result.byteLength).toEqual(1);
      expect(result[0]).toEqual(0x02);
    });

    it('Reads data correctly after multiple reads / one append', async () => {
      const readBuffer = new ReadBuffer();

      const resultPromise1 = readBuffer.read(1);
      const resultPromise2 = readBuffer.read(1);

      await readBuffer.append(Uint8Array.from([0x02, 0x03]));

      const result1 = await resultPromise1;
      const result2 = await resultPromise2;

      expect(result1.byteLength).toEqual(1);
      expect(result1[0]).toEqual(0x02);

      expect(result2.byteLength).toEqual(1);
      expect(result2[0]).toEqual(0x03);
    });

    it('Reads data correctly after multiple reads / appends', async () => {
      const readBuffer = new ReadBuffer();

      const resultPromise1 = readBuffer.read(1);
      const resultPromise2 = readBuffer.read(1);

      await readBuffer.append(Uint8Array.from([0x02]));
      await readBuffer.append(Uint8Array.from([0x03]));

      const result1 = await resultPromise1;
      const result2 = await resultPromise2;

      expect(result1.byteLength).toEqual(1);
      expect(result1[0]).toEqual(0x02);

      expect(result2.byteLength).toEqual(1);
      expect(result2[0]).toEqual(0x03);
    });
  });
});
