import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
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
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { FileDataType, VideoFileData } from 'src/app/@types/file';
import { BaseComponent } from 'src/app/base/base.component';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { LogUtils } from 'src/app/service/util/logger';
import { videoconverter as componentConfig } from 'src/environments/component-config';
import { v4 } from 'uuid';
import * as JSZip from 'jszip';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import {
  ConvertLogEvent,
  ConvertProgressEvent,
  FFMpegCommandType,
  FileLoadedEvent,
} from 'src/app/@types/ffmpeg';
import { FFMPEG_COMMANDS } from 'src/environments/ffmpeg-commands';
import { FfmpegService } from 'src/app/service/ffmpeg/ffmpeg.service';

@Component({
  selector: 'app-video-converter',
  templateUrl: './video-converter.component.html',
  styleUrls: ['./video-converter.component.scss'],
})
export class VideoConverterComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  fileList: VideoFileData[] = [];

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  ERROR_MESSAGE: string = '* error: invalid file type';
  isMobile!: boolean;
  destroyed = new Subject<void>();

  isDownloadAllActive: boolean = true;
  zipBuilder!: JSZip;

  fileIndexes: Map<string, number>;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private appContextService: AppContextService,
    private renderer: Renderer2,
    private zoneRef: NgZone,
    private breakpointObserver: BreakpointObserver,
    private ffmpegService: FfmpegService
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

    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Web])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isMobile = breakpointObserver.isMatched('(max-width: 735px)');
        LogUtils.info(`mobile view: ${this.isMobile}`);
      });

    this.fileIndexes = new Map();

    /**
     * configure ffmpeg service
     */
    this.ffmpegService.initialize();
    this.ffmpegService.fileLoadedEvent.subscribe(
      this.handleBufferFileLoad.bind(this)
    );
    this.ffmpegService.progressEvent.subscribe(
      this.handleConverionProgress.bind(this)
    );
    this.ffmpegService.convertLogEvent.subscribe(
      this.handleFFMpegLog.bind(this)
    );
  }

  ngOnInit(): void {
    LogUtils.info('video converter: ngOnInit');
  }

  ngAfterViewInit() {
    LogUtils.info('video converter: ngAfterViewInit');
    this.zipBuilder = new JSZip();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    this.ffmpegService.exit();
  }

  async selectFiles(event: any) {
    for (const file of event.target.files) {
      await this.addFileToConvert(file);
    }
    await this.sortFiles();
  }

  openFileDialog() {
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
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
        .forEach(async file => await this.addFileToConvert(file));
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach(
        async file => await this.addFileToConvert(file)
      );
    }
    await this.sortFiles();
  }

  /**
   * handle file loaded in buffer event
   * @param eventData
   */
  async handleBufferFileLoad(eventData: FileLoadedEvent): Promise<void> {
    LogUtils.info(`file loaded: ${eventData.fileId}`);
    this.zoneRef.run(() => {
      if (eventData.loaded) {
        // this.fileList[this.fileIndexes.get(eventData.fileId)!].isLoaded = true;
        this.fileList.find(file => file.id === eventData.fileId)!.isLoaded =
          true;
        LogUtils.info(this.fileList);
        LogUtils.info(this.fileIndexes);
      } else {
        LogUtils.info(
          `fail to load file with id: ${eventData.fileId} in buffer`
        );
      }
    });
  }

  /**
   * handle file conversion progress
   * @param eventData
   */
  async handleConverionProgress(eventData: ConvertProgressEvent) {
    this.zoneRef.run(() => {
      const videoFileData: VideoFileData =
        this.fileList[this.fileIndexes.get(eventData.fileId)!];
      videoFileData.convertProgress = eventData.progress;
      videoFileData.inProgress = true;

      /**
       * conversion has been completed
       */
      if (eventData.progress === 100) {
        videoFileData.isConverted = true;
        videoFileData.inProgress = false;
      }
    });
  }

  handleFFMpegLog(logParams: ConvertLogEvent) {
    LogUtils.info(`FFMPEG LOGS => ${logParams.message}`);
  }

  /**
   * add file to convert
   * @param file
   */
  async addFileToConvert(file: File) {
    this.zoneRef.run(() => {
      const videoFileData: VideoFileData = {
        id: v4(),
        file: file,
        inProgress: false,
        type: FileDataType.VIDEO,
        name: this.formatFileName(file.name),
        isValid: this.isValidFileFormat(file),
        convertProgress: 0,
        targetFormat: 'mp3',
        isConverted: false,
        isLoaded: false,
        error: this.isValidFileFormat(file) ? undefined : this.ERROR_MESSAGE,
      };
      this.fileList.push(videoFileData);

      /**
       * keep index mapping for fast access
       */
      this.fileIndexes.set(
        videoFileData.id,
        this.fileList.findIndex(file => file.id === videoFileData.id)
      );

      /**
       * load file in ffmpeg buffer
       */
      if (videoFileData.isValid) {
        this.ffmpegService.writeFileInFFMpegBuffer(videoFileData);
      }
    });
  }

  async convertVideoFile(videoFileData: VideoFileData): Promise<void> {
    this.ffmpegService.submitFileToConvert(videoFileData);
  }

  formatFileName(fileName: string): string {
    return fileName.replace(/ /g, '_');
  }

  async downloadAll(): Promise<void> {
    this.fileList
      .filter(videoFileData => videoFileData.isValid)
      .forEach(videoFileData =>
        this.zipBuilder.file(
          videoFileData.name,
          videoFileData.convertedFileData!,
          {
            binary: true,
          }
        )
      );

    const zipFileData: Blob = await this.zipBuilder.generateAsync({
      type: 'blob',
    });
    this.downloadFile('converted-videos.zip', zipFileData);
  }

  async downloadVideo(videoFileData: VideoFileData): Promise<void> {
    const fileName: string =
      videoFileData.name.substring(0, videoFileData.name.lastIndexOf('.')) ||
      videoFileData.name;
    await this.downloadFile(
      `${fileName}-converted.${videoFileData.targetFormat}`,
      videoFileData.convertedFileData!
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

  /**
   * validate if video file is of valid format or not
   * @param file
   * @returns
   */
  isValidFileFormat(file: File): boolean {
    return ['video/mp4'].includes(file.type);
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

  /**
   * change video file target format
   * @param fileId identifier of file
   * @param targetFormat
   */
  changeTargetFormat(fileId: string, targetFormat: string) {
    LogUtils.info(
      `changing target format of file with id: ${fileId} to ${targetFormat}`
    );
    this.fileList.find(file => file.id === fileId)!.targetFormat = targetFormat;
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
}
