import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileData, FileDataType } from 'src/app/@types/file';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { AppIconService } from 'src/app/service/icon/app-icon.service';
import { LogUtils } from 'src/app/service/util/logger';
import { v4 } from 'uuid';
import { default as imageCompression } from 'browser-image-compression';

@Component({
  selector: 'app-image-compression',
  templateUrl: './image-compression.component.html',
  styleUrls: ['./image-compression.component.scss'],
})
export class ImageCompressionComponent extends BaseComponent implements OnInit {
  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    appIconService: AppIconService,
    titleService: Title,
    metaService: Meta,
    private renderer: Renderer2
  ) {
    super(router, configService, contextService, titleService, metaService);
    this.contextService.setCurrentAppId('imagecompress');
    this.updatePageMetaData();
    this.tags = <string[]>(
      this.configService.getApplicationConfig(
        this.contextService.getCurrentAppId()
      )?.tags
    );
  }

  fileList: FileData[] = [];

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  ngOnInit(): void {
    LogUtils.info('image compression component has rendered');
  }

  async openFileDialog() {
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
  }

  async selectFiles(event: any) {
    for (const file of event.target.files) {
      const isValid = this.isValidFileFormat(file);
      this.fileList.push({
        id: v4(),
        file: file,
        type: FileDataType.IMAGE,
        inProgress: false,
        compressProgress: 0,
        isCompressed: false,
        name: file.name,
        isValid,
        error: isValid ? undefined : '* error: invalid file type',
        compressOptions: {
          signal: new AbortController().signal,
        },
        oldSize: this.formatBytes(file.size),
      });
    }
  }

  async startCompressAll() {
    this.fileList
      .filter(fileData => fileData.isValid)
      .forEach(fileData => this.compressImage(fileData));
  }

  async compressImage(fileData: FileData) {
    fileData.inProgress = true;
    fileData.compressProgress = 0;
    fileData.error = undefined;
    try {
      fileData.compressedData = await imageCompression(fileData.file, {
        ...fileData.compressOptions,
        onProgress: progress => {
          fileData.compressProgress = progress;
        },
      });
      fileData.compressedSize = this.formatBytes(fileData.compressedData.size);
      fileData.isCompressed = true;
      fileData.inProgress = false;
    } catch (error) {
      LogUtils.error(`error while compressing image with id: ${fileData.id}`);
      fileData.inProgress = false;
      fileData.isCompressed = false;
      fileData.error = '* compression error';
    }
  }

  downloadImage(fileData: FileData) {
    const fileName: string = fileData.file.name;
    LogUtils.info(fileName.substring(0, fileName.lastIndexOf('.')) || fileName);

    const downloadAnchor = this.renderer.createElement('a');
    this.renderer.setProperty(
      downloadAnchor,
      'href',
      URL.createObjectURL(fileData.compressedData!)
    );
    this.renderer.setProperty(
      downloadAnchor,
      'download',
      'compressedImage.png'
    );
    downloadAnchor.click();
  }

  isValidFileFormat(file: File): boolean {
    return ['image/jpeg', 'image/png'].includes(file.type);
  }

  /**
   * format size in to higher terms
   * @param bytes
   * @param decimals
   * @returns
   */
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k: number = 1024;
    const dm: number = decimals < 0 ? 0 : decimals;
    const sizes: string[] = [
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    ];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  showInfo(fileData: FileData) {}
}
