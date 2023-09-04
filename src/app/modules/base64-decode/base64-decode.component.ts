import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { LogUtils } from 'src/app/service/util/logger';
import {
  descriptionData,
  componentConfig,
} from 'src/environments/component-config/base64-decode/config';

@Component({
  selector: 'app-base64-decode',
  templateUrl: './base64-decode.component.html',
  styleUrls: ['./base64-decode.component.scss'],
})
export class Base64DecodeComponent {
  // base64 data
  base64Data: string | undefined;

  @ViewChild('text1AreaContent', { static: false })
  text1AreaContent!: ElementRef;

  decodeFileData: any = {
    name: null,
    blob: null,
  };

  omitMimeTypeChars: string[] = ['@'];

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(private renderer: Renderer2) {}

  async updateBase64(base64: string) {
    this.renderer.setProperty(
      this.text1AreaContent.nativeElement,
      'innerText',
      base64
    );
  }

  async onDataPaste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');
    this.updateBase64(pastedData);
  }

  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }

  async decodeBase64(): Promise<void> {
    /**
     * base64 content in format data:text/csv;base64,assafcasfewfewf
     */
    const base64Content: string =
      this.text1AreaContent.nativeElement.innerText.trim();
    if (base64Content === '') {
      return;
    }

    /**
     * string base64 string
     */
    const base64Data: string = base64Content.split(',')[1];

    const mimeType: string = this.getMimeType(base64Content);
    LogUtils.info(`mime type: ${mimeType}`);

    this.dataURItoBlob(base64Data).subscribe((blob: Blob) => {
      this.decodeFileData.blob = blob;
    });

    this.decodeFileData.name = `base64-decoded-file.${mimeType
      .split('/')
      .pop()}`;
  }

  /**
   * get mimeType from base64 data URI
   * @param base64Content
   * @returns
   */
  getMimeType(base64Content: string): string {
    return base64Content.substring(
      base64Content.indexOf(':') + 1,
      base64Content.indexOf(';')
    );
  }

  async downloadDecodedFile(): Promise<void> {
    this.downloadFile(this.decodeFileData.name, this.decodeFileData.blob);
  }

  /* Method to convert Base64Data Url as Image Blob */
  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      observer.next(blob);
      observer.complete();
    });
  }

  async downloadFile(fileName: string, fileContent: Blob): Promise<void> {
    const downloadAnchor = this.renderer.createElement('a');
    this.renderer.setProperty(
      downloadAnchor,
      'href',
      URL.createObjectURL(fileContent)
    );
    this.renderer.setProperty(downloadAnchor, 'download', fileName);
    downloadAnchor.click();
  }
}
