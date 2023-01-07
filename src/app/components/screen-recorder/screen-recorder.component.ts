import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
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
import { screenrecorder as componentConfig } from 'src/environments/component-config';
import { get, set } from 'idb-keyval';
import { AddStreamOptions, VideoStreamMerger } from 'video-stream-merger';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.scss'],
})
export class ScreenRecorderComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  appId: string = 'imagecompress';
  isRecording: boolean = false;
  isProcessingStream: boolean = false;

  /**
   * recording start and end time
   */
  startTime: Date | undefined;
  endTime: Date | undefined;
  timerIntervalFunctionId: any;
  timeCounter: number = 0;

  recordFileExtension: string = 'webm';

  static RECORDING_START_DELAY = 3000;

  /**
   * recording options
   */
  includeScreenAudio: boolean = false;
  includeMicAudio: boolean = false;
  includeCameraVideo: boolean = false;

  screenStream: MediaStream | undefined;
  webcamStream: MediaStream | undefined;
  mergedMediaStream: MediaStream | undefined;

  fileList: any = {};

  showMergedVideo: boolean = false;

  /**
   * media recorder instance holder
   */
  mediaStreamRecorder: MediaRecorder | undefined;
  videoFileBuffer: Blob[] = [];

  @ViewChild('timer', { static: false })
  timer!: ElementRef;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private renderer: Renderer2,
    private zoneRef: NgZone
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
    this.updateTags(componentConfig);
  }

  ngOnInit(): void {
    LogUtils.info('screen recorder component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('screen recorder component: ngAfterViewInit');
  }

  startRecording() {
    this.zoneRef.run(async () => {
      this.isRecording = true;
      this.startTime = new Date();
      this.screenStream = undefined;
      this.webcamStream = undefined;
      this.mergedMediaStream = undefined;

      /**
       * resetting timer
       */
      this.renderer.setProperty(
        this.timer.nativeElement,
        'textContent',
        '00:00'
      );

      try {
        this.screenStream = await this.getScreenStream();
        // LogUtils.info(this.screenStream);

        /**
         * configure stream ended listener in case user manually stops media
         * stream using native stop sharing button
         */
        this.configureStreamStopListener(this.screenStream);
        this.configureTimer();
      } catch (error) {
        LogUtils.error(`error occured while capturing screen stream`);
        LogUtils.error(error);
        this.stopRecording();
      }

      try {
        /**
         * requesting audio/video media stream
         */
        if (this.includeMicAudio || this.includeCameraVideo) {
          this.webcamStream = await this.getCameraAndMicStream();
          this.configureStreamStopListener(this.webcamStream);
          // LogUtils.info(this.webcamStream);
        }
      } catch (error) {
        LogUtils.error(
          `error occured while capturing camera or mic media stream`
        );
        LogUtils.error(error);
        this.stopRecording();
      }

      if (this.webcamStream) {
        this.mergedMediaStream = this.mergeStreams(
          this.screenStream!,
          this.webcamStream
        )!;

        if (
          this.mergedMediaStream === null ||
          this.mergedMediaStream === undefined
        ) {
          LogUtils.error(`error encountered while merging media streams`);
          this.stopRecording();
        }
      } else {
        this.mergedMediaStream = this.screenStream!;
      }

      if (this.mergedMediaStream) {
        /**
         * configure media stream recorder
         */
        this.configureStreamRecorder(this.mergedMediaStream);
        // setTimeout(() => {
        //   this.startShowingMergedVideo(this.mergedMediaStream);
        // }, 2000);
      }
    });
  }

  /**
   * configure stream ended listener
   * @param mediaStream
   */
  configureStreamStopListener(mediaStream: MediaStream): void {
    if (
      mediaStream.getVideoTracks() &&
      mediaStream.getVideoTracks().length > 0
    ) {
      mediaStream.getVideoTracks()[0].addEventListener('ended', event => {
        LogUtils.info(`video media stream has ended`);
        if (this.isRecording) {
          this.stopRecording();
        }
      });
    }
    if (
      mediaStream.getAudioTracks() &&
      mediaStream.getAudioTracks().length > 0
    ) {
      mediaStream.getAudioTracks()[0].addEventListener('ended', event => {
        LogUtils.info(`audio media stream has ended`);
        if (this.isRecording) {
          this.stopRecording();
        }
      });
    }
  }

  /**
   * merge screen and web cam media streams
   * @param screenStream
   * @param webcamStream
   * @returns
   */
  mergeStreams(
    screenStream: MediaStream,
    webcamStream: MediaStream
  ): MediaStream | null {
    let streamMerger: VideoStreamMerger = new VideoStreamMerger();

    const mergeScreenStreamOptions: AddStreamOptions = {
      x: 0,
      y: 0,
      width: streamMerger.width,
      height: streamMerger.height,
      mute: true,
      index: 0,
      muted: true,
      draw: (ctx, frame, done) => {
        ctx.drawImage(frame, 0, 0, streamMerger.width, streamMerger.height);
        done();
      },
      audioEffect: (sourceNode, destinationNode) => {
        sourceNode.connect(destinationNode);
      },
    };

    // Add the screen capture. Position it to fill the whole stream (the default)
    streamMerger.addStream(screenStream, mergeScreenStreamOptions);

    const mergeWebcamStreamOptions: AddStreamOptions = {
      x: 0,
      y: streamMerger.height - 100,
      width: 100,
      height: 100,
      mute: false,
      index: 1,
      muted: false,
      draw: (ctx, frame, done) => {
        ctx.drawImage(frame, 0, 0, 100, 100);
        done();
      },
      audioEffect: (sourceNode, destinationNode) => {
        sourceNode.connect(destinationNode);
      },
    };

    // Add the webcam stream. Position it on the bottom left and resize it to 100x100.
    streamMerger.addStream(webcamStream, mergeWebcamStreamOptions);

    // Start the merging. Calling this makes the result available to us
    streamMerger.start();

    // We now have a merged MediaStream!
    return streamMerger.result;
  }

  configureStreamRecorder(mediaStream: MediaStream) {
    LogUtils.info(`configuring media stream recorder`);
    LogUtils.info(mediaStream);

    const mediaRecorderOptions: MediaRecorderOptions = {
      mimeType: `video/${this.recordFileExtension}`,
    };

    // const mediaRecorderOptions: MediaRecorderOptions = {
    //   mimeType: 'video/mp4',
    // };

    this.mediaStreamRecorder = new MediaRecorder(
      mediaStream,
      mediaRecorderOptions
    );

    // reset file buffer
    this.videoFileBuffer = [];

    this.mediaStreamRecorder.ondataavailable = (event: BlobEvent) => {
      this.videoFileBuffer.push(event.data);
    };

    /**
     * Need video stream slices of 1 second each
     */
    this.mediaStreamRecorder.start(1000);
  }

  configureTimer() {
    this.timeCounter = 0;
    this.zoneRef.runOutsideAngular(() => {
      this.timerIntervalFunctionId = setInterval(() => {
        this.timeCounter = this.timeCounter + 1;
        this.renderer.setProperty(
          this.timer.nativeElement,
          'textContent',
          new Date(this.timeCounter * 1000).toISOString().substring(11, 16)
        );
      }, 1);
    });
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

  stopRecording() {
    this.zoneRef.run(async () => {
      this.isRecording = false;
      this.mediaStreamRecorder?.stop();
      this.endTime = new Date();
      this.timeCounter = 0;
      if (this.timerIntervalFunctionId) {
        clearInterval(this.timerIntervalFunctionId);
      }
      this.screenStream?.getTracks().forEach(track => track.stop());
      this.webcamStream?.getTracks().forEach(track => track.stop());
      this.mergedMediaStream?.getTracks().forEach(track => track.stop());

      if (this.screenStream && this.mergedMediaStream) {
        this.processMediaStream();
      }
    });
  }

  processMediaStream() {
    this.isProcessingStream = true;
    setTimeout(() => {
      this.downloadVideoFile(
        `recorded-video-file.${this.recordFileExtension}`,
        new Blob(this.videoFileBuffer, {
          type: `video/${this.recordFileExtension}`,
        })
      )
        .then(() => {
          this.zoneRef.run(() => {
            this.isProcessingStream = false;
          });
        })
        .catch(error => {
          LogUtils.info(
            `error occured while preparing video file for download`
          );
          LogUtils.error(error);
        });
    }, ScreenRecorderComponent.RECORDING_START_DELAY);
  }

  startShowingMergedVideo(mediaStream: any): void {
    this.showMergedVideo = true;
    const videoTag: HTMLVideoElement = this.renderer.selectRootElement(
      '#mergedVideo',
      true
    );
    try {
      this.renderer.setProperty(videoTag, 'srcObject', mediaStream);
    } catch (error) {
      this.renderer.setProperty(
        videoTag,
        'src',
        URL.createObjectURL(mediaStream)
      );
    }
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
}
