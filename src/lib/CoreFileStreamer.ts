/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This helper class will read the file in chunks and then return as data urls
 */
export class CoreFileStreamer {
  private offset: number = 0;
  private readonly defaultChunkSize: number;
  private totalFragments: number = 0;

  constructor(private file: File, defaultChunkSize?: number) {
    this.defaultChunkSize = defaultChunkSize ? defaultChunkSize : 64 * 1024;
    this.totalFragments = Math.ceil(file.size / this.defaultChunkSize);
    this.rewind();
  }

  public getTotalFragments() {
    return this.totalFragments;
  }

  public rewind(): void {
    this.offset = 0;
  }

  public isEndOfFile(): boolean {
    return this.offset >= this.getFileSize();
  }

  public readBlockAsDataUrl(
    length: number = this.defaultChunkSize
  ): Promise<string> {
    const fileReader: FileReader = new FileReader();
    const blob: Blob = this.file.slice(this.offset, this.offset + length);

    return new Promise<any>((resolve, reject) => {
      fileReader.onloadend = (event: ProgressEvent) => {
        const target: FileReader = event.target as FileReader;
        if (target.error == null) {
          const result: any = target.result;
          this.offset += result.length;
          // this.testEndOfFile();
          resolve(result);
        } else {
          reject(target.error);
        }
      };
      fileReader.readAsDataURL(blob);
    });
  }

  public readBlockAsArrayBuffer(
    length: number = this.defaultChunkSize
  ): Promise<ArrayBuffer> {
    const fileReader: FileReader = new FileReader();
    const blob: Blob = this.file.slice(this.offset, this.offset + length);

    return new Promise<ArrayBuffer>((resolve, reject) => {
      fileReader.onloadend = (event: ProgressEvent) => {
        const target: FileReader = event.target as FileReader;
        if (target.error == null) {
          const result: any = target.result;
          this.offset += blob.size;
          // this.testEndOfFile();
          resolve(result);
        } else {
          reject(target.error);
        }
      };
      fileReader.readAsArrayBuffer(blob);
    });
  }

  public readBlockAsText(
    length: number = this.defaultChunkSize
  ): Promise<string> {
    const fileReader: FileReader = new FileReader();
    const blob: Blob = this.file.slice(this.offset, this.offset + length);

    return new Promise<string>((resolve, reject) => {
      fileReader.onloadend = (event: ProgressEvent) => {
        const target: FileReader = event.target as FileReader;
        if (target.error == null) {
          const result: string = target.result as string;
          this.offset += blob.size;
          resolve(result);
        } else {
          reject(target.error);
        }
      };
      fileReader.readAsText(blob);
    });
  }

  public async readFullFileAsText(): Promise<string> {
    this.rewind();
    let content = "";

    while (!this.isEndOfFile()) {
      const chunk = await this.readBlockAsText();
      content += chunk;
    }

    return content;
  }

  private getFileSize(): number {
    return this.file.size;
  }
}
