import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { BaseFileData, FileDataType } from 'src/app/@types/file';
import { importScript } from 'src/app/service/ffmpeg/lib/util';
import { FileService } from 'src/app/service/file/file.service';
import { LogUtils } from 'src/app/service/util/logger';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/image-cropper/config';
import { v4 } from 'uuid';
import { ImageCroppedEvent, OutputFormat } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  validImageFormats: string = '.jpg,.jpeg,.png,.webp,.bmp';

  fileList: BaseFileData[] = [];

  currentFile: BaseFileData | undefined = undefined;

  croppedImage: string | undefined = undefined;

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  @ViewChild('imageCropper', { static: false })
  imageCropper!: ElementRef;

  @ViewChild('croppedImageContainer', { static: false })
  croppedImageContainer!: ElementRef;

  @ViewChild('croppedImageTag', { static: false })
  croppedImageTag!: ElementRef;

  outputFormat: OutputFormat = 'png'; // supported values - png, jpeg, webp, bmp, ico

  constructor(
    private renderer: Renderer2,
    private fileService: FileService,
    public platformMetadataService: PlatformMetadataService
  ) {
    if (platformMetadataService.isPlatformBrowser) {
      importScript(environment.hammerJSPathUrl);
    }
  }

  selectFiles(event: any) {
    for (const file of event.target.files) {
      this.addFileToCrop(file);
    }
    // set first file as current file
    this.currentFile = this.fileList[0];
  }

  openFileDialog() {
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
  }

  /**
   * file drop event handler
   * @param event
   */
  dropHandler(event: any) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items]
        .filter(item => item.kind === 'file')
        .map(item => item.getAsFile())
        .forEach(file => this.addFileToCrop(file));
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach(file => this.addFileToCrop(file));
    }

    // set first file as current file
    this.currentFile = this.fileList[0];
  }

  /**
   * handle drag over event
   * @param event
   */
  dragOverHandler(event: any) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }

  addFileToCrop(file: File) {
    const fileData: BaseFileData = {
      id: v4(),
      file: file,
      type: FileDataType.IMAGE,
      name: file.name,
    };

    this.fileList.push(fileData);
    this.fileService.readFileAsURL(
      fileData.id,
      file,
      this.readImageDataURI.bind(this)
    );
  }

  selectCurrentFile(id: string) {
    const fileData = this.fileList.find(fileData => fileData.id === id);
    this.currentFile = fileData;
    if (this.currentFile?.dataURI === undefined) {
      this.fileService.readFileAsURL(
        id,
        fileData!.file,
        this.readImageDataURI.bind(this)
      );
    }
  }

  cropperReady() {
    const width = this.imageCropper.nativeElement.offsetWidth;
    const height = this.imageCropper.nativeElement.offsetHeight;

    this.renderer.setStyle(
      this.croppedImageContainer.nativeElement,
      'max-width',
      `${width}px`
    );

    this.renderer.setStyle(
      this.croppedImageContainer.nativeElement,
      'max-height',
      `${height}px`
    );

    this.renderer.setStyle(
      this.croppedImageTag.nativeElement,
      'max-width',
      `${width}px`
    );

    this.renderer.setStyle(
      this.croppedImageTag.nativeElement,
      'max-height',
      `${height}px`
    );
  }

  readImageDataURI(id: string, imageDataURI: any) {
    const fileData = this.fileList.find(fileData => fileData.id === id);
    fileData!.dataURI = imageDataURI;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = URL.createObjectURL(event.blob!);
  }

  loadImageFailed() {
    LogUtils.error(
      `cropper image load failed for image with id: ${this.currentFile?.id} and name: ${this.currentFile?.name}`
    );
  }

  async downloadCroppedImage() {
    const formattedFileName = this.fileService.getFormattedFileName(
      this.currentFile!.name
    );
    const plainFileName = this.fileService.getPlainFileName(formattedFileName);
    const downloadAnchor = this.renderer.createElement('a');
    this.renderer.setProperty(downloadAnchor, 'href', this.croppedImage);
    this.renderer.setProperty(
      downloadAnchor,
      'download',
      `${plainFileName}.${this.outputFormat}`
    );
    downloadAnchor.click();
  }

  onOutputFormatChange(event: string) {
    this.outputFormat = <OutputFormat>event;
  }
}
