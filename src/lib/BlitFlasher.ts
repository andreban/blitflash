import {BlitConnection, BlitRecord, BlitDrive} from './BlitConnection';
import {sleep} from './util';

const BLIT_DEVICE_FILTER = {usbVendorId: 0x0483, usbProductId: 0x5740};
const BLIT_DEVICE_FILTERS = [BLIT_DEVICE_FILTER];

export class BlitFlasher {
  private port: SerialPort;
  private connection?: BlitConnection;

  constructor(port: SerialPort) {
    this.port = port;
  }

  /**
   * Opens a connection to the 32Blit.
   */
  async open(): Promise<void> {
    await this.port.open({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
    });

    this.connection = new BlitConnection(
      this.port.readable!.getReader(),
      this.port.writable!.getWriter(),
    );
  }

  /**
   * Closes the connection to the 32Blit.
   */
  async close(): Promise<void> {
    await this.connection?.close();
    await this.port?.close();
  }

  /**
   * Returns the 32Blit status.
   */
  async status(): Promise<string> {
    return this.connection!.status();
  }

  /**
   * Lists blit files installed on the 32Blit flash.
   */
  async list(): Promise<BlitRecord[]> {
    return this.connection!.list();
  }

  /**
   * Sends a blit file to the 32blit.
   */
  async sendFile(data: Uint8Array, drive: BlitDrive, filename: string, directory = ''): Promise<void> {
    return this.connection!.sendFile(data, drive, filename, directory);
  }

  /**
   * Resets the 32Blit.
   */
  async reset(): Promise<void> {
    if (this.connection) {
      await this.connection.reset();
      await this.connection.close();
      await this.port.close();
    }
    await sleep(1000);
    await this.open();
  }

  /**
   * Return true if the browser is able to connect to a 32Blit over the serial port.
   */
  static supportsWebSerial(): boolean {
    return 'serial' in navigator;
  }

  /**
   * Returns a previously approved serial port for the 32Blit or requests the user to authorise one.
   */
  static async getOrRequestPort(): Promise<SerialPort> {
    const ports = await this.getPorts();
    if (ports.length > 0) {
      return ports[0];
    }

    return await this.requestPort();
  }

  /**
   * Retrieves previously approved serial ports for the 32Blit.
   */
  static async getPorts(): Promise<SerialPort[]> {
    const ports = await navigator.serial.getPorts();
    return ports.filter((port) => {
      const info = port.getInfo();
      return info.usbProductId == BLIT_DEVICE_FILTER.usbProductId &&
          info.usbVendorId === BLIT_DEVICE_FILTER.usbVendorId;
    });
  }

  /**
   * Asks the user to authorise a serial port for the 32Blit.
   */
  static async requestPort(): Promise<SerialPort> {
    return await navigator.serial.requestPort({filters: BLIT_DEVICE_FILTERS});
  }
}
