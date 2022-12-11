import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  FileData,
  FileDataType,
  ImageCompressSettings,
} from 'src/app/@types/file';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { AppIconService } from 'src/app/service/icon/app-icon.service';
import { LogUtils } from 'src/app/service/util/logger';
import { default as imageCompression } from 'browser-image-compression';
import * as JSZip from 'jszip';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { CompressSettingsComponent } from '../compress-settings/compress-settings.component';
import { v4 } from 'uuid';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-image-compression',
  templateUrl: './image-compression.component.html',
  styleUrls: ['./image-compression.component.scss'],
})
export class ImageCompressionComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    appIconService: AppIconService,
    titleService: Title,
    metaService: Meta,
    private renderer: Renderer2,
    private zoneRef: NgZone,
    breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    @Inject(DOCUMENT) document: any
  ) {
    super(
      router,
      configService,
      contextService,
      titleService,
      metaService,
      document
    );
    this.contextService.setCurrentAppId('imagecompress');
    this.updatePageMetaData();
    this.tags = <string[]>(
      this.configService.getApplicationConfig(
        this.contextService.getCurrentAppId()
      )?.tags
    );

    breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Web])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isMobile = breakpointObserver.isMatched('(max-width: 735px)');
        LogUtils.info(`mobile view: ${this.isMobile}`);
      });
  }

  isMobile!: boolean;
  fileList: FileData[] = [];
  zipBuilder!: JSZip;

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  destroyed = new Subject<void>();
  isDownloadAllActive: boolean = false;
  activeDialog: MatDialogRef<any> | undefined;

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
  async openSettingsDialog(file: FileData) {
    this.closeDialog();
    const dialogConfig: MatDialogConfig = { data: file };
    this.activeDialog = this.dialog.open(
      CompressSettingsComponent,
      dialogConfig
    );

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
        const fileData: FileData = this.fileList.find(
          fileData => fileData.id === compressSettings.fileId
        )!;

        if (fileData.compressionRate !== compressSettings.compressionRate) {
          fileData.isCompressed = false;
        }

        fileData.compressionRate = compressSettings.compressionRate;
        fileData.maxFileSize = compressSettings.maxFileSize;
        fileData.compressOptions = {
          ...fileData.compressOptions,
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
  }

  async selectFiles(event: any) {
    for (const file of event.target.files) {
      await this.addFileToCompress(file);
    }
    await this.sortFiles();
  }

  async startCompressAll() {
    this.fileList
      .filter(fileData => fileData.isValid)
      .forEach(fileData => this.compressImage(fileData));
  }

  async compressImage(fileData: FileData) {
    this.zoneRef.run(async () => {
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
        fileData.isCompressed = true;
        fileData.inProgress = false;
        this.isDownloadAllActive = true;
      } catch (error) {
        LogUtils.error(
          `error while compressing image with name: ${fileData.file.name}`
        );
        fileData.inProgress = false;
        fileData.isCompressed = false;
        fileData.error = '* compression error';
      }
    });
  }

  async downloadAll(): Promise<void> {
    this.fileList
      .filter(fileData => fileData.isValid)
      .forEach(fileData =>
        this.zipBuilder.file(fileData.name, fileData.compressedData!, {
          binary: true,
        })
      );

    const zipFileData: Blob = await this.zipBuilder.generateAsync({
      type: 'blob',
    });
    this.downloadFile('compress-images.zip', zipFileData);
  }

  async downloadImage(fileData: FileData): Promise<void> {
    const fileName: string =
      fileData.name.substring(0, fileData.file.name.lastIndexOf('.')) ||
      fileData.name;
    const extension = fileData.file.name.split('.').pop();
    await this.downloadFile(
      `${fileName}-compressed.${extension}`,
      fileData.compressedData!
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

  showInfo(fileData: FileData) {}
}
