import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
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

  /**
   * read file contents as text
   * @param file
   * @param callback
   */
  async readFileAsURL(id: string, file: File, callback: any): Promise<void> {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => callback(id, fileReader.result);
    fileReader.readAsDataURL(file);
  }

  /**
   * download a file with specified name
   * @param fileName
   * @param fileContent
   * @param renderer
   */
  async downloadFile(
    fileName: string,
    fileContent: Blob,
    renderer: Renderer2
  ): Promise<void> {
    const downloadAnchor = renderer.createElement('a');
    renderer.setProperty(
      downloadAnchor,
      'href',
      URL.createObjectURL(fileContent)
    );
    renderer.setProperty(downloadAnchor, 'download', fileName);
    downloadAnchor.click();
  }
}
