import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  FileDataType,
  SupportedOutputFormats,
  VideoFileData,
} from 'src/app/@types/file';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { LogUtils } from 'src/app/service/util/logger';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/video-converter/config';
import { v4 } from 'uuid';
import {
  ConvertEvent,
  ConvertEventType,
  ConvertLogEvent,
  ConvertProgressEvent,
  FFMpegLoadingStatus,
  FileLoadedEvent,
} from 'src/app/@types/ffmpeg';
import { FfmpegService } from 'src/app/service/ffmpeg/ffmpeg.service';
import {
  PopupFormContext,
  PopupFormElementType,
  PopupFormSubmitResult,
  PopupFormType,
} from 'src/app/@types/popup-form';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupFormComponent } from 'src/app/modules/popup-form/popup-form.component';
import {
  ELIGIBLE_TARGET_FORMATS,
  FFMPEG_FORMATS,
} from 'src/environments/ffmpeg-config';
import { environment } from 'src/environments/environment';
import { MOBILE_VIEW_WIDTH_THRESHOLD } from 'src/app/service/util/contants';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';

@Component({
  selector: 'app-video-converter',
  templateUrl: './video-converter.component.html',
  styleUrls: ['./video-converter.component.scss'],
})
export class VideoConverterComponent implements OnDestroy {
  fileStore: Map<string, VideoFileData>;
  fileDisplayList: VideoFileData[];

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  ERROR_MESSAGE: string = '* error: invalid file type';
  isMobile!: boolean;
  destroyed = new Subject<void>();

  isDownloadAllActive: boolean = false;

  activeDialog: MatDialogRef<any> | undefined;

  isSupported: boolean = true;

  subscriptions: Subscription[];
  conversionLogs: string[];

  /**
   * valid video formats
   */
  validVideoFormats: string = '.mp4,.webm,.ogv,.mkv,.ogm,.avi';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private appContextService: AppContextService,
    private renderer: Renderer2,
    private zoneRef: NgZone,
    private breakpointObserver: BreakpointObserver,
    private ffmpegService: FfmpegService,
    private metaConfigService: MetaConfigService,
    private iconConfigService: IconConfigService
  ) {
    this.iconConfigService.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer
    );
    this.metaConfigService.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
    this.appContextService.tags = componentConfig.tags;
    this.appContextService.mainHeading = componentConfig.mainHeading!;
    this.appContextService.subHeading = componentConfig.subHeading;
    this.appContextService.relatedTools = componentConfig.relatedTools;
    this.appContextService.descrptionData = descriptionData;

    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Web])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isMobile = breakpointObserver.isMatched(
          `(max-width: ${MOBILE_VIEW_WIDTH_THRESHOLD})`
        );
        this.checkCompatibility();
      });

    this.fileStore = new Map();
    this.fileDisplayList = [];

    this.subscriptions = [];

    this.subscriptions.push(
      this.ffmpegService.fileLoadedEvent.subscribe(
        this.handleBufferFileLoad.bind(this)
      )
    );

    this.subscriptions.push(
      this.ffmpegService.progressEvent.subscribe(
        this.handleConverionProgress.bind(this)
      )
    );

    this.subscriptions.push(
      this.ffmpegService.convertLogEvent.subscribe(
        this.handleFFMpegLog.bind(this)
      )
    );

    this.subscriptions.push(
      this.ffmpegService.convertEvent.subscribe(
        this.handleConvertEvent.bind(this)
      )
    );

    this.subscriptions.push(
      this.ffmpegService.ffmpegStateEvent.subscribe(
        this.handleFFMpegStatus.bind(this)
      )
    );

    this.conversionLogs = [];

    this.checkCompatibility();
  }

  async ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();

    /**
     * unsubscribe from all the subscriptions
     */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
    await this.ffmpegService.flushBuffer();
  }

  checkCompatibility() {
    if (environment.production) {
      this.isSupported = true;
    }
  }

  /**
   * handle ffmpeg status event
   * @param eventData
   */
  async handleFFMpegStatus(eventData: FFMpegLoadingStatus) {
    this.zoneRef.run(() => {
      this.fileStore.get(eventData.fileId)!.converterStatus = eventData.status;
    });
  }

  /**
   * handle file loaded in buffer event
   * @param eventData
   */
  async handleBufferFileLoad(eventData: FileLoadedEvent): Promise<void> {
    this.zoneRef.run(() => {
      if (eventData.loaded) {
        // this.fileStore.get(eventData.fileId)!.isLoaded = true;
        LogUtils.info(
          `file with id: ${eventData.fileId} loaded in ffmpeg buffer`
        );
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
      LogUtils.info(
        `[conversion progress] ( progress: ${eventData.progress}, file id: ${eventData.fileId})`
      );
      const videoFileData: VideoFileData = this.fileStore.get(
        eventData.fileId
      )!;
      videoFileData.convertProgress = eventData.progress;
      videoFileData.inProgress = true;

      /**
       * conversion has been completed
       */
      if (eventData.progress === 100) {
        videoFileData.inProgress = false;
      }
    });
  }

  /**
   * handle file convert event
   * @param eventData
   */
  async handleConvertEvent(eventData: ConvertEvent) {
    if (eventData.type === ConvertEventType.END) {
      this.zoneRef.run(() => {
        this.isDownloadAllActive = true;
      });
      // LogUtils.info(`converted file received with id: ${eventData.fileId}`);
      this.fileStore
        .get(eventData.fileId)!
        .convertedFileData.set(eventData.targetFormat, eventData.fileData);
    } else if (eventData.type === ConvertEventType.FAILED) {
      LogUtils.info(`conversion failed for file with id: ${eventData.fileId}`);
      this.zoneRef.run(() => {
        const videoFileData: VideoFileData = this.fileStore.get(
          eventData.fileId
        )!;
        videoFileData.conversionErrors.set(
          eventData.targetFormat,
          'conversion failed! try converting in some other format'
        );
        videoFileData.inProgress = false;
      });
    }
  }

  /**
   * handle ffmpeg logs
   * @param logParams
   */
  handleFFMpegLog(logParams: ConvertLogEvent) {
    LogUtils.info(`[FMPEG LOGS]: ${logParams.message}`);
    if (this.isMobile) {
      this.conversionLogs.push(logParams.message);
    }
  }

  /**
   * show logs on popup modal
   */
  downloadLogs() {
    this.downloadFile(
      'log-files.txt',
      new Blob([this.conversionLogs.join('\n\n')], {
        type: 'text/plain',
      })
    );
  }

  /**
   * add file to convert
   * @param file
   */
  async addFileToConvert(file: File) {
    this.zoneRef.run(() => {
      const formattedName = this.formatFileName(file.name);
      const extension = formattedName.split('.').pop()!;
      const id = v4();
      const videoFileData: VideoFileData = {
        id,
        file: file,
        inProgress: false,
        type: FileDataType.VIDEO,
        name: `${this.ffmpegService.getPlainFileName(
          formattedName
        )}_${id}.${extension}`,
        convertProgress: 0,
        targetFormat: 1,
        convertedFileData: new Map(),
        conversionErrors: new Map(),
        supportedFormats: this.getSupportedTargetFormats(extension),
        fileFormat: this.resolveFileFormatId(extension),
      };
      this.fileStore.set(videoFileData.id, videoFileData);
      this.fileDisplayList.push(videoFileData);
    });
  }

  /**
   * resolve file format id
   * @param fileExtension
   * @returns
   */
  resolveFileFormatId(fileExtension: string): number {
    for (const [formatId, ffmpegFormat] of FFMPEG_FORMATS.entries()) {
      if (ffmpegFormat.targetFormat === fileExtension) {
        return formatId;
      }
    }
    return 6; // default for mp4
  }

  /**
   * get supported target formats
   * @returns
   */
  getSupportedTargetFormats(extension: string): SupportedOutputFormats[] {
    const formats: SupportedOutputFormats[] = ELIGIBLE_TARGET_FORMATS.get(
      extension
    )!.map(formatId => {
      return {
        formatId,
        targetFormat: FFMPEG_FORMATS.get(formatId)!.targetFormat,
        displayName: FFMPEG_FORMATS.get(formatId)!.displayName,
      };
    });
    return formats;
  }

  /**
   * trigger conversion for all videos at once
   */
  async convertAllVideos() {
    for (let videoFileData of this.fileStore.values()) {
      if (
        !videoFileData.inProgress &&
        !videoFileData.convertedFileData.has(videoFileData.targetFormat)
      ) {
        this.convertVideoFile(videoFileData);
      }
    }
  }

  /**
   * schedule video for conversion
   * @param videoFileData
   */
  async convertVideoFile(videoFileData: VideoFileData): Promise<void> {
    this.zoneRef.run(() => {
      videoFileData.inProgress = true;
      videoFileData.convertProgress = 0;
    });
    this.ffmpegService.submitFileToConvert(videoFileData);
  }

  formatFileName(fileName: string): string {
    return fileName.replace(/ /g, '_');
  }

  async downloadVideo(videoFileData: VideoFileData): Promise<void> {
    const fileName: string = this.ffmpegService.getPlainFileName(
      videoFileData.name
    );
    await this.downloadFile(
      `${fileName}_converted.${
        FFMPEG_FORMATS.get(videoFileData.targetFormat)!.targetFormat
      }`,
      new Blob(
        [videoFileData.convertedFileData!.get(videoFileData.targetFormat)!],
        {
          type: this.getMimeType(videoFileData.targetFormat),
        }
      )
    );
  }

  /**
   * resolve mimeType for downloading the file
   * @param targetFormat
   * @returns
   */
  getMimeType(targetFormat: number) {
    const targetFormatName: string =
      FFMPEG_FORMATS.get(targetFormat)!.targetFormat;
    if (targetFormatName === 'mp4' || targetFormatName === 'webm') {
      return `video/${targetFormatName}`;
    }
    return `audio/${targetFormatName}`;
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
   * change video file target format
   * @param fileId identifier of file
   * @param targetFormat
   */
  changeTargetFormat(fileId: string, targetFormat: number) {
    const videoFileData = this.fileStore.get(fileId)!;
    if (videoFileData.targetFormat !== targetFormat) {
      LogUtils.info(
        `changing target format of file with id: ${fileId} to ${FFMPEG_FORMATS.get(
          targetFormat
        )!}`
      );
      this.fileStore.get(fileId)!.targetFormat = targetFormat;
    }
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

  /**
   * open settings popup form
   * @param videoFileData
   */
  openSettings(videoFileData: VideoFileData) {
    this.closeDialog();

    const formattedName = this.formatFileName(videoFileData.file.name);
    const extension = formattedName.split('.').pop()!;
    const formatOptions: SupportedOutputFormats[] =
      this.getSupportedTargetFormats(extension);

    const context: PopupFormContext = {
      referenceId: videoFileData.id,
      type: PopupFormType.VIDEO_CONVERT_SETTINGS,
      rows: [
        {
          elements: [
            {
              type: PopupFormElementType.DROPDOWN,
              propertyName: 'targetFormat',
              data: {
                options: formatOptions.map(option => {
                  return {
                    displayName: option.displayName,
                    value: option.formatId,
                  };
                }),
                targetFormat: videoFileData.targetFormat,
              },
            },
          ],
        },
      ],
    };

    this.activeDialog = this.dialog.open(PopupFormComponent, {
      data: context,
    });

    /**
     * subscribe dialog close event
     */
    this.activeDialog
      .afterClosed()
      .subscribe(this.handleSettingsChange.bind(this));
  }

  /**
   * handle settings change
   * @param data
   */
  async handleSettingsChange(data: any = {}) {
    LogUtils.info(`settings dialog closed with data: ${JSON.stringify(data)}`);
    if (Object.keys(data).length > 0) {
      const result = <PopupFormSubmitResult>data;
      const videoFileData: VideoFileData = this.fileStore.get(
        result.referenceId
      )!;
      this.zoneRef.run(() => {
        videoFileData.targetFormat = result.data.targetFormat;
      });
    }
  }

  async closeDialog(data = {}) {
    if (this.activeDialog) {
      this.activeDialog.close(data);
    }
  }

  async selectFiles(event: any) {
    for (const file of event.target.files) {
      await this.addFileToConvert(file);
    }
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
  }
}
