import {BlitConnection, BlitRecord} from './BlitConnection';
import {sleep} from './util';

export class BlitFlasher {
  private port: SerialPort;
  private connection?: BlitConnection;

  constructor(port: SerialPort) {
    this.port = port;
  }

  async open(): Promise<void> {
    await this.port.open({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1
    });

    this.connection = new BlitConnection(
      this.port.readable!.getReader(),
      this.port.writable!.getWriter(),
    );
  }

  async close(): Promise<void> {
    this.connection?.close();
  }

  async status(): Promise<string> {
    return this.connection!.status();
  }

  async list(): Promise<BlitRecord[]> {
    return this.connection!.list();
  }

  async reset(): Promise<void> {
    if (this.connection) {
      await this.connection.reset();
      await this.connection.close();
      await this.port.close();
    }
    await sleep(1000);
    await this.open();
  }
}
