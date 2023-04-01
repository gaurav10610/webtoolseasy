import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  /**
   * read file contents as text
   * @param file
   * @param callback
   */
  async readFileAsText(file: File, callback: any): Promise<void> {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => callback(fileReader.result);
    fileReader.readAsText(file);
  }
}
