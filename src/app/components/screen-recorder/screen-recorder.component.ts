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

  /**
   * recording options
   */
  includeScreenAudio: boolean = false;
  includeMicAudio: boolean = false;
  includeCameraVideo: boolean = false;

  screenStream: MediaStream | undefined;
  webcamStream: MediaStream | undefined;

  @ViewChild('timer', { static: false })
  timer!: ElementRef;

  fileList: any = {};

  /**
   * media recorder instance holder
   */
  mediaRecorder: MediaRecorder | undefined;

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

      let finalMediaStream: MediaStream | null;
      if (this.webcamStream) {
        finalMediaStream = this.mergeStreams(
          this.screenStream!,
          this.webcamStream
        );

        if (finalMediaStream === null) {
          LogUtils.error(`error encountered while merging media streams`);
          this.stopRecording();
        }
      } else {
        finalMediaStream = this.screenStream!;
      }

      /**
       * configure media stream recorder
       */
      this.configureStreamRecorder(finalMediaStream!);
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
      this.endTime = new Date();
      this.timeCounter = 0;
      if (this.timerIntervalFunctionId) {
        clearInterval(this.timerIntervalFunctionId);
      }
      this.screenStream?.getTracks().forEach(track => track.stop());
      this.webcamStream?.getTracks().forEach(track => track.stop());
    });
  }

  async processingStream() {}

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
}
