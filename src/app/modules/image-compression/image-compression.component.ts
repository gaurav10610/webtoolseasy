import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ImageFileData,
  FileDataType,
  ImageCompressSettings,
} from 'src/app/@types/file';
import { LogUtils } from 'src/app/service/util/logger';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/image-compression/config';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { importScript } from 'src/app/service/ffmpeg/lib/util';
import { environment } from 'src/environments/environment';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { FileService } from 'src/app/service/file/file.service';

declare var imageCompression: any;

@Component({
  selector: 'app-image-compression',
  templateUrl: './image-compression.component.html',
  styleUrls: ['./image-compression.component.scss'],
})
export class ImageCompressionComponent implements OnDestroy {
  isMobile!: boolean;
  fileList: ImageFileData[] = [];

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  destroyed = new Subject<void>();
  isDownloadAllActive: boolean = false;
  activeDialog: MatDialogRef<any> | undefined;

  validImageFormats: string = '.jpg,.jpeg,.png,.webp,.bmp';

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  currentFile: ImageFileData | undefined = undefined;

  constructor(
    private renderer: Renderer2,
    private zoneRef: NgZone,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public platformMetaDataService: PlatformMetadataService,
    private fileService: FileService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Web])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isMobile = breakpointObserver.isMatched('(max-width: 735px)');
        LogUtils.info(`mobile view: ${this.isMobile}`);
      });

    if (platformMetaDataService.isPlatformBrowser) {
      importScript(environment.imageCompressionLibUrl);
    }
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  async openFileDialog() {
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
  }

  /**
   * handle compression rate change event
   * @param data
   */
  async handleSettingsChange(data: any = {}) {
    LogUtils.info(`settings dialog closed with data: ${JSON.stringify(data)}`);

    /**
     * process only if some settings has been changed
     */
    if (Object.keys(data).length > 0) {
      const compressSettings: ImageCompressSettings = <ImageCompressSettings>(
        data
      );
      this.zoneRef.run(() => {
        const ImageFileData: ImageFileData = this.fileList.find(
          ImageFileData => ImageFileData.id === compressSettings.fileId
        )!;

        if (
          ImageFileData.compressionRate !== compressSettings.compressionRate
        ) {
          ImageFileData.isCompressed = false;
        }

        ImageFileData.compressionRate = compressSettings.compressionRate;
        ImageFileData.maxFileSize = compressSettings.maxFileSize;
        ImageFileData.compressOptions = {
          ...ImageFileData.compressOptions,
          maxSizeMB: compressSettings.maxFileSize / 1024 / 1024,
        };
      });
    }
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
        .forEach(async file => await this.addFileToCompress(file));
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach(
        async file => await this.addFileToCompress(file)
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

  async addFileToCompress(file: File) {
    this.zoneRef.run(() => {
      const imageFileData: ImageFileData = {
        id: crypto.randomUUID(),
        file: file,
        type: FileDataType.IMAGE,
        inProgress: false,
        compressProgress: 0,
        isCompressed: false,
        name: file.name,
        compressOptions: {
          signal: new AbortController().signal,
          maxSizeMB: (0.9 * file.size) / 1024 / 1024,
          useWebWorker: true,
        },
        compressionRate: 10,
        maxFileSize: 0.9 * file.size,
      };

      this.fileList.push(imageFileData);
      this.fileService.readFileAsURL(
        imageFileData.id,
        file,
        this.readImageDataURI.bind(this)
      );
    });
  }

  readImageDataURI(id: string, imageDataURI: any) {
    const fileData = this.fileList.find(fileData => fileData.id === id);
    fileData!.dataURI = imageDataURI;
  }

  async selectFiles(event: any) {
    for (const file of event.target.files) {
      await this.addFileToCompress(file);
    }
    // set first file as current file
    this.currentFile = this.fileList[0];
  }

  async startCompressAll() {
    this.fileList.forEach(imageFileData => this.compressImage(imageFileData));
  }

  async compressImage(fileData?: ImageFileData) {
    const imageFileData = fileData ? fileData : this.currentFile!;
    this.zoneRef.run(async () => {
      imageFileData.inProgress = true;
      imageFileData.compressProgress = 0;
      imageFileData.error = undefined;
      try {
        imageFileData.compressedData = await imageCompression(
          imageFileData.file,
          {
            ...imageFileData.compressOptions,
            onProgress: (progress: number) => {
              imageFileData.compressProgress = progress;
            },
          }
        );
        imageFileData.isCompressed = true;
        imageFileData.inProgress = false;
        this.isDownloadAllActive = true;
      } catch (error) {
        LogUtils.error(
          `error while compressing image with name: ${imageFileData.file.name}`
        );
        imageFileData.inProgress = false;
        imageFileData.isCompressed = false;
        imageFileData.error = '* compression error';
      }
    });
  }

  async downloadImage(fileData?: ImageFileData): Promise<void> {
    const imageFileData = fileData ? fileData : this.currentFile!;
    const fileName: string =
      imageFileData.name.substring(
        0,
        imageFileData.file.name.lastIndexOf('.')
      ) || imageFileData.name;
    const extension = imageFileData.file.name.split('.').pop();
    await this.downloadFile(
      `${fileName}-compressed.${extension}`,
      imageFileData.compressedData!
    );
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

  onCompressionRateChange(event: any) {
    this.currentFile!.compressionRate = event.target.value;
    const compressionRatio: number = 100 - event.target.value;
    this.currentFile!.maxFileSize =
      (compressionRatio / 100) * this.currentFile!.file.size;
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

  selectCurrentFile(id: string) {
    const fileData = this.fileList.find(fileData => fileData.id === id);
    this.currentFile = fileData;
  }
}
