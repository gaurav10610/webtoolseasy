import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import {
  ImageFileData,
  FileDataType,
  ImageCompressSettings,
} from 'src/app/@types/file';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { default as imageCompression } from 'browser-image-compression';

/**
 * @TODO use fflate instead
 */
import * as JSZip from 'jszip';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompressSettingsComponent } from 'src/app/components/compress-settings/compress-settings.component';
import { v4 } from 'uuid';
import { DOCUMENT } from '@angular/common';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/image-compression/config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-image-compression',
  templateUrl: './image-compression.component.html',
  styleUrls: ['./image-compression.component.scss'],
})
export class ImageCompressionComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  isMobile!: boolean;
  fileList: ImageFileData[] = [];
  zipBuilder!: JSZip;

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  destroyed = new Subject<void>();
  isDownloadAllActive: boolean = false;
  activeDialog: MatDialogRef<any> | undefined;
  appId: string = 'imagecompress';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    private zoneRef: NgZone,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private appContextService: AppContextService
  ) {
    super();
    this.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer,
      this.platformId
    );
    this.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
    this.appContextService.tags = componentConfig.tags;
    this.appContextService.mainHeading = componentConfig.mainHeading!;
    this.appContextService.subHeading = componentConfig.subHeading;
    this.appContextService.descrptionData = descriptionData;

    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Web])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isMobile = breakpointObserver.isMatched('(max-width: 735px)');
        LogUtils.info(`mobile view: ${this.isMobile}`);
      });
  }

  ngOnInit(): void {
    LogUtils.info('image compression component has rendered');
  }

  ngAfterViewInit(): void {
    this.zipBuilder = new JSZip();
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
   * open settings dialog
   * @param file
   */
  async openSettingsDialog(file: ImageFileData) {
    this.closeDialog();
    this.activeDialog = this.dialog.open(CompressSettingsComponent, {
      data: file,
    });

    /**
     * subscribe dialog close event
     */
    this.activeDialog
      .afterClosed()
      .subscribe(this.handleSettingsChange.bind(this));
  }

  async closeDialog(data = {}) {
    if (this.activeDialog) {
      this.activeDialog.close(data);
    }
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
    await this.sortFiles();
  }

  /**
   * handle drag over event
   * @param event
   */
  async dragOverHandler(event: any) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }

  async sortFiles() {
    /**
     * sorting the list to keep invalid files at one end
     */
    this.fileList = this.fileList.sort((value1, value2) => {
      if (value2.isValid) {
        return 1;
      }

      if (value1.isValid) {
        return -1;
      }

      return 0;
    });
  }

  async addFileToCompress(file: File) {
    this.zoneRef.run(() => {
      this.fileList.push({
        id: v4(),
        file: file,
        type: FileDataType.IMAGE,
        inProgress: false,
        compressProgress: 0,
        isCompressed: false,
        name: file.name,
        isValid: this.isValidFileFormat(file),
        error: this.isValidFileFormat(file)
          ? undefined
          : '* error: invalid file type',
        compressOptions: {
          signal: new AbortController().signal,
          maxSizeMB: (0.9 * file.size) / 1024 / 1024,
        },
        compressionRate: 10,
        maxFileSize: 0.9 * file.size,
      });
    });
  }

  async selectFiles(event: any) {
    for (const file of event.target.files) {
      await this.addFileToCompress(file);
    }
    await this.sortFiles();
  }

  async startCompressAll() {
    this.fileList
      .filter(ImageFileData => ImageFileData.isValid)
      .forEach(ImageFileData => this.compressImage(ImageFileData));
  }

  async compressImage(ImageFileData: ImageFileData) {
    this.zoneRef.run(async () => {
      ImageFileData.inProgress = true;
      ImageFileData.compressProgress = 0;
      ImageFileData.error = undefined;
      try {
        ImageFileData.compressedData = await imageCompression(
          ImageFileData.file,
          {
            ...ImageFileData.compressOptions,
            onProgress: progress => {
              ImageFileData.compressProgress = progress;
            },
          }
        );
        ImageFileData.isCompressed = true;
        ImageFileData.inProgress = false;
        this.isDownloadAllActive = true;
      } catch (error) {
        LogUtils.error(
          `error while compressing image with name: ${ImageFileData.file.name}`
        );
        ImageFileData.inProgress = false;
        ImageFileData.isCompressed = false;
        ImageFileData.error = '* compression error';
      }
    });
  }

  async downloadAll(): Promise<void> {
    this.fileList
      .filter(ImageFileData => ImageFileData.isValid)
      .forEach(ImageFileData =>
        this.zipBuilder.file(
          ImageFileData.name,
          ImageFileData.compressedData!,
          {
            binary: true,
          }
        )
      );

    const zipFileData: Blob = await this.zipBuilder.generateAsync({
      type: 'blob',
    });
    this.downloadFile('compress-images.zip', zipFileData);
  }

  async downloadImage(imageFileData: ImageFileData): Promise<void> {
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

  showInfo(ImageFileData: ImageFileData) {}
}
