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
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { screenrecorder as componentConfig } from 'src/environments/component-config';

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

  /**
   * recording start and end time
   */
  startTime: Date | undefined;
  endTime: Date | undefined;
  timeoutFunctionId: any;
  timeCounter: number = 0;

  /**
   * recording options
   */
  includeScreenAudio = false;

  screenStream: MediaStream | undefined;

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
        this.configureStreamStopListener(this.screenStream);
        this.configureTimer();
        LogUtils.info(this.screenStream);
      } catch (error) {
        LogUtils.error(`error occured while capturing screen stream`);
        LogUtils.error(error);
      }
    });
  }

  configureStreamStopListener(screenStream: MediaStream) {
    screenStream.getVideoTracks()[0].addEventListener('ended', event => {
      LogUtils.info(`screen stream has ended`);
      if (this.isRecording) {
        this.stopRecording();
      }
    });
  }

  configureTimer() {
    this.timeCounter = 0;
    this.zoneRef.runOutsideAngular(() => {
      this.timeoutFunctionId = setInterval(() => {
        this.timeCounter = this.timeCounter + 1;
        this.renderer.setProperty(
          this.timer.nativeElement,
          'textContent',
          new Date(this.timeCounter * 1000).toISOString().substring(11, 16)
        );
      }, 1);
    });
  }

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

  stopRecording() {
    this.isRecording = false;
    this.endTime = new Date();
    this.timeCounter = 0;
    if (this.timeoutFunctionId) {
      clearInterval(this.timeoutFunctionId);
    }
    this.screenStream?.getTracks().forEach(track => track.stop());
  }

  recorderOptionChange(event: any, optionId: string) {
    LogUtils.info(`recorder option changed: ${optionId}`);
    LogUtils.info(event);
  }
}
