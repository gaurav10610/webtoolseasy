import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  descriptionData,
  componentConfig,
} from 'src/environments/component-config/base64-encode/config';
import { Clipboard } from '@angular/cdk/clipboard';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Component({
  selector: 'app-base64-encode',
  templateUrl: './base64-encode.component.html',
  styleUrls: ['./base64-encode.component.scss'],
})
export class Base64EncodeComponent {
  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  typeDefination: string | undefined;

  // base64 data
  base64Data: string | undefined;

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private renderer: Renderer2,
    private clipboard: Clipboard
  ) {}

  async openFileDialog() {
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
  }

  async selectFiles(event: any) {
    this.encodeFileToBase64(event.target.files[0]);
  }

  /**
   * file drop event handler
   * @param event
   */
  async dropHandler(event: any) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items]
        .filter(item => item.kind === 'file')
        .map(item => item.getAsFile())
        .forEach(file => this.encodeFileToBase64(file));
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach(file =>
        this.encodeFileToBase64(file)
      );
    }
  }

  /**
   * handle drag over event
   * @param event
   */
  async dragOverHandler(event: any) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }

  /**
   * encode file to base64
   * @param file
   */
  encodeFileToBase64(file: File) {
    const fileReader: FileReader = new FileReader();

    fileReader.addEventListener(
      'load',
      () => {
        this.base64Data = <string>fileReader.result;
      },
      false
    );

    fileReader.readAsDataURL(file);
  }

  /**
   * copy base64 data
   * @param type
   */
  copyBase64Data(type: string) {
    if (type === 'base64') {
      this.clipboard.copy(<string>this.base64Data?.split(',').pop());
    } else if (type === 'uri') {
      this.clipboard.copy(<string>this.base64Data);
    }
  }
}
