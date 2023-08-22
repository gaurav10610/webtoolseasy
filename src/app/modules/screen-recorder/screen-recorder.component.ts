import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/screen-recorder/config';
import { clear, get, set } from 'idb-keyval';
import { VideoStreamMerger } from 'video-stream-merger';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { environment } from 'src/environments/environment';
import { MOBILE_VIEW_WIDTH_THRESHOLD } from 'src/app/service/util/contants';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.scss'],
})
export class ScreenRecorderComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appId: string = 'imagecompress';
  isRecording: boolean = false;
  isProcessingStream: boolean = false;

  /**
   * recording paused flag
   */
  isRecPaused: boolean = false;

  timerIntervalFunctionId: any;
  timeCounter: number = 0;

  videoChunksIds: number[] = [];

  videoFileExtention: string = 'webm';
  recorderOptionConfig: any = {
    webm: {
      mimeType: 'video/webm; codecs=vp9',
    },
    mp4: {
      mimeType: 'video/mp4',
    },
  };

  cameraVideoOptions = {
    width: 150,
    height: 150,
  };

  static RECORDING_START_DELAY_MS = 5000;

  // timeslice in ms
  static RECORDER_TIME_SLICE_MS = 100;

  /**
   * recording options
   */
  includeScreenAudio: boolean = false;
  includeMicAudio: boolean = false;
  includeCameraVideo: boolean = false;

  screenStream: MediaStream | undefined;
  webcamStream: MediaStream | undefined;
  mergedMediaStream: MediaStream | undefined;
  videoChunksCounter = 0;

  isSupported: boolean = true;
  isMobile!: boolean;

  /**
   * media recorder instance holder
   */
  mediaStreamRecorder: MediaRecorder | undefined;

  destroyed = new Subject<void>();

  config: CountdownConfig = {
    demand: false,
  };

  @ViewChild('cd', { static: false })
  countdown!: CountdownComponent;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private renderer: Renderer2,
    private zoneRef: NgZone,
    private breakpointObserver: BreakpointObserver,
    private appContextService: AppContextService
  ) {
    super();
    this.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer,
      this.platformId,
      this.appContextService
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
    this.appContextService.relatedTools = componentConfig.relatedTools;
    this.appContextService.descrptionData = descriptionData;

    /**
     * screen resize handler
     */
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Web])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isMobile = breakpointObserver.isMatched(
          `(max-width: ${MOBILE_VIEW_WIDTH_THRESHOLD})`
        );
        this.checkCompatibility();
      });
    this.checkCompatibility();
  }

  checkCompatibility() {
    if (environment.production) {
      this.isSupported = !this.isMobile;
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      clear();
    }
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    LogUtils.info('screen recorder component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('screen recorder component: ngAfterViewInit');
  }

  resetContextVariables() {
    this.screenStream = undefined;
    this.webcamStream = undefined;
    this.mergedMediaStream = undefined;
    this.mediaStreamRecorder = undefined;
    this.videoChunksCounter = 0;
    this.videoChunksIds = [];
  }

  /**
   * start screen recording
   */
  startRecording() {
    this.zoneRef.run(async () => {
      this.isRecording = true;
      this.countdown.restart();
      this.resetContextVariables();

      // clear all buffer data from index db
      await clear();

      try {
        this.screenStream = await this.getScreenStream();
        LogUtils.info(
          `screen stream dimensions: ${this.getVideoStreamHeightWidth(
            this.screenStream
          )}`
        );

        /**
         * configure stream ended listener in case user manually stops media
         * stream using native stop sharing button
         */
        this.configureStreamStopListener(this.screenStream);
      } catch (error) {
        LogUtils.error(`error occured while capturing screen stream`);
        LogUtils.error(error);
        this.stopRecording();
      }

      try {
        if (this.includeMicAudio || this.includeCameraVideo) {
          this.webcamStream = await this.getCameraAndMicStream();
          this.configureStreamStopListener(this.webcamStream);
        }
      } catch (error) {
        LogUtils.error(
          `error occured while capturing camera or mic media stream`
        );
        LogUtils.error(error);
        this.stopRecording();
      }

      if (this.webcamStream) {
        this.mergedMediaStream = this.mergeMediaStreams(
          this.screenStream!,
          this.webcamStream
        )!;

        if (!this.mergedMediaStream) {
          LogUtils.error(`error encountered while merging media streams`);
          this.stopRecording();
        }
      } else {
        this.mergedMediaStream = this.screenStream!;
      }

      if (this.mergedMediaStream) {
        this.configureStreamRecorder(this.mergedMediaStream);
      }
    });
  }

  /**
   * configure stream ended listener
   * @param mediaStream
   */
  configureStreamStopListener(mediaStream: MediaStream): void {
    mediaStream.getTracks().forEach(track => {
      track.addEventListener('ended', event => {
        LogUtils.info(`media stream track has ended`);
        if (this.isRecording) {
          this.stopRecording();
        }
      });
    });
  }

  /**
   * merge screen and web cam media streams
   * @param screenStream
   * @param webcamStream
   * @returns
   */
  mergeMediaStreams(
    screenStream: MediaStream,
    webcamStream: MediaStream
  ): MediaStream | null {
    const screenStreamSettings: MediaTrackSettings = this.screenStream
      ?.getVideoTracks()[0]
      .getSettings()!;

    const mergerOptions: any = {
      width: screenStreamSettings.width!,
      height: screenStreamSettings.height!,
    };

    let streamMerger: VideoStreamMerger = new VideoStreamMerger(mergerOptions);

    const mergeScreenStreamOptions: any = {
      x: 0,
      y: 0,
      width: streamMerger.width,
      height: streamMerger.height,
      mute: true,
      index: 0,
    };

    // Add the screen capture. Position it to fill the whole stream (the default)
    streamMerger.addStream(screenStream, mergeScreenStreamOptions);

    const mergeWebcamStreamOptions: any = {
      x: streamMerger.width - this.cameraVideoOptions.width,
      y: streamMerger.height - this.cameraVideoOptions.height,
      width: this.cameraVideoOptions.width,
      height: this.cameraVideoOptions.height,
      mute: false,
      index: 1,
    };

    // Add the webcam stream. Position it on the bottom left and resize it to 100x100.
    streamMerger.addStream(webcamStream, mergeWebcamStreamOptions);

    // Start the merging. Calling this makes the result available to us
    streamMerger.start();

    // We now have a merged MediaStream!
    return streamMerger.result;
  }

  /**
   * configure media stream recorder
   * @param mediaStream
   */
  configureStreamRecorder(mediaStream: MediaStream) {
    LogUtils.info(`configuring media stream recorder`);

    this.mediaStreamRecorder = new MediaRecorder(
      mediaStream,
      this.recorderOptionConfig[this.videoFileExtention]
    );

    this.mediaStreamRecorder.ondataavailable = (event: BlobEvent) => {
      const id = Date.now();
      /**
       * write data in index db
       */
      set(id, event.data);
      this.videoChunksIds.push(id);
    };

    /**
     * Need video stream slices of 1 second each
     */
    this.mediaStreamRecorder.start(
      ScreenRecorderComponent.RECORDER_TIME_SLICE_MS
    );
    this.countdown.begin();
  }

  /**
   * get screen media stream
   * @returns
   */
  async getScreenStream(): Promise<MediaStream> {
    const screenCaptureOptions = {
      video: true,
      audio: false,
    };

    if (this.includeScreenAudio) {
      screenCaptureOptions.audio = true;
    }
    return navigator.mediaDevices.getDisplayMedia(screenCaptureOptions);
  }

  /**
   * get camera & mic video/audio stream
   * @returns
   */
  async getCameraAndMicStream(): Promise<MediaStream> {
    const getUserMediaOptions = {
      video: this.includeCameraVideo,
      audio: this.includeMicAudio,
    };
    return navigator.mediaDevices.getUserMedia(getUserMediaOptions);
  }

  /**
   * pause media stream recording
   */
  pauseRecording() {
    this.mediaStreamRecorder?.pause();
    this.isRecPaused = true;
    this.countdown.pause();
  }

  /**
   * resume media stream recoring
   */
  resumeRecording() {
    this.mediaStreamRecorder?.resume();
    this.isRecPaused = false;
    this.countdown.resume();
  }

  /**
   * stop media stream recording
   */
  stopRecording() {
    this.mediaStreamRecorder?.stop();
    this.screenStream?.getTracks().forEach(track => track.stop());
    this.webcamStream?.getTracks().forEach(track => track.stop());
    this.mergedMediaStream?.getTracks().forEach(track => track.stop());

    if (this.screenStream && this.mergedMediaStream) {
      this.processMediaStream();
    }
    this.isRecording = false;
    this.countdown.stop();
  }

  processMediaStream() {
    this.isProcessingStream = true;
    setTimeout(async () => {
      try {
        const videoFileBuffer = [];

        this.videoChunksIds.sort(function (a, b) {
          return a - b;
        });

        const totalChunks = this.videoChunksIds.length;

        for (let index = 0; index < totalChunks; index++) {
          videoFileBuffer.push(await get(this.videoChunksIds[index]));
        }

        await this.downloadVideoFile(
          `recorded-video-file.webm`,
          new Blob(videoFileBuffer, {
            type: `video/webm`,
          })
        );

        this.zoneRef.run(() => (this.isProcessingStream = false));
        clear();
      } catch (error) {
        LogUtils.info(`error occured while preparing video file for download`);
        LogUtils.error(error);
        this.zoneRef.run(() => (this.isProcessingStream = false));
      }
    }, ScreenRecorderComponent.RECORDING_START_DELAY_MS);
  }

  /**
   * checkbox change event
   * @param event object wrapping event data
   * @param optionId identifier of capture option
   */
  recorderOptionChange(event: MatCheckboxChange, optionId: string) {
    LogUtils.info(`recorder option changed: ${optionId}`);
    switch (optionId) {
      case 'mic-audio':
        this.includeMicAudio = event.checked;
        break;
      case 'camera-video':
        this.includeCameraVideo = event.checked;
        break;
    }
  }

  async downloadVideoFile(fileName: string, fileContent: Blob): Promise<void> {
    const downloadAnchor = this.renderer.createElement('a');
    this.renderer.setProperty(
      downloadAnchor,
      'href',
      URL.createObjectURL(fileContent)
    );
    this.renderer.setProperty(downloadAnchor, 'download', fileName);
    downloadAnchor.click();
  }

  getVideoStreamHeightWidth(mediaStream: MediaStream) {
    if (mediaStream.getVideoTracks().length > 0) {
      const settings: MediaTrackSettings = mediaStream
        .getVideoTracks()[0]
        .getSettings();
      return `[ height: ${settings.height}, width: ${settings.width} ]`;
    }
    return '';
  }
}
