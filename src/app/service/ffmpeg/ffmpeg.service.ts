import { EventEmitter, Injectable } from '@angular/core';
import {
  ConvertEvent,
  ConvertEventType,
  ConvertLogEvent,
  ConvertProgressEvent,
  FFMpegLoadingStatus,
  FFMpegMediaFormatConfig,
  FFMpegMediaFormatType,
  FileLoadedEvent,
} from 'src/app/@types/ffmpeg';
import { VideoFileData } from 'src/app/@types/file';
import { QueueStorage } from 'src/app/custom-datastructures/QueueStorage';
import { FFMPEG_OUTPUT_CONFIG } from 'src/environments/ffmpeg-config';
import { LogUtils } from 'src/app/service/util/logger';
import { FFmpeg } from 'src/app/packages/ffmpeg/src';
import { fetchFile, toBlobURL } from 'src/app/packages/util/src';
import { FSNode } from 'src/app/packages/ffmpeg/src/types';
// import { FFmpeg } from '@ffmpeg/ffmpeg';
// import { toBlobURL, fetchFile, importScript } from '@ffmpeg/util';
// import { FSNode } from '@ffmpeg/ffmpeg/dist/esm/types';

// declare var FFmpeg: any;
// declare var toBlobURL: any;
// declare var FSNode: any;
// declare var fetchFile: any;
// declare var importScript: any;

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  private ffmpeg!: FFmpeg;

  /**
   * queue data strcuture to hold the submitted files
   */
  private fileQueue!: QueueStorage<VideoFileData>;
  private isConverting = false;
  private currentFile: VideoFileData | undefined = undefined;

  /**
   * fileId -> targetFormat
   */
  private fileMap!: Map<string, string>;

  progressEvent!: EventEmitter<ConvertProgressEvent>;
  convertEvent!: EventEmitter<ConvertEvent>;
  fileLoadedEvent!: EventEmitter<FileLoadedEvent>;
  convertLogEvent!: EventEmitter<ConvertLogEvent>;
  ffmpegStateEvent!: EventEmitter<FFMpegLoadingStatus>;

  constructor() {
    this.init();
  }

  init() {
    this.fileQueue = new QueueStorage();
    this.fileMap = new Map();

    this.progressEvent = new EventEmitter();
    this.convertEvent = new EventEmitter();
    this.fileLoadedEvent = new EventEmitter();
    this.convertLogEvent = new EventEmitter();
    this.ffmpegStateEvent = new EventEmitter();
  }

  async initializeFFMpeg() {
    this.ffmpeg = new FFmpeg();

    this.ffmpeg.on('log', this.handleLogs.bind(this));

    this.ffmpeg.on('progress', this.handleFFMpegProgress.bind(this));

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/esm';
    await this.ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
    });
  }

  async flushBuffer() {
    if (this.ffmpeg && this.ffmpeg.loaded) {
      const files: FSNode[] = await this.ffmpeg.listDir('/');
      files.forEach(fileNode => this.ffmpeg.deleteFile(fileNode.name));
    }
  }

  /**
   * handle conversion logs
   * @param logParams
   */
  handleLogs(logParams: any) {
    this.convertLogEvent.emit({
      ...logParams,
    });

    const { message } = logParams;
    if (message === 'Conversion failed!') {
      /**
       * emit conversion failed event
       */
      this.convertEvent.emit({
        fileId: this.currentFile!.id,
        type: ConvertEventType.FAILED,
        targetFormat: this.currentFile!.targetFormat,
      });

      // free up the buffer memory
      this.ffmpeg.deleteFile(this.currentFile!.targetFileName!);
      this.ffmpeg.deleteFile(this.currentFile!.name);

      this.currentFile = undefined;
      this.isConverting = false;

      /**
       * if file queue is not empty then schedule next file for conversion
       */
      if (!this.fileQueue.isEmpty() && !this.isConverting) {
        this.isConverting = true;
        const videoFileData: VideoFileData = this.fileQueue.dequeue();
        this.currentFile = videoFileData;
        this.convertVideoFile(videoFileData);
      }
    }
  }

  /**
   * handles file progress
   * @param progressParams
   */
  async handleFFMpegProgress(progressParams: any) {
    const progress: number = Number((progressParams.ratio * 100).toFixed(2));
    this.progressEvent.emit({
      fileId: this.currentFile!.id,
      progress,
    });

    /**
     * this means, that current file is converted completely so reset the context
     */
    if (progress === 100) {
      /**
       * conversion complete event
       */
      this.convertEvent.emit({
        fileId: this.currentFile!.id,
        type: ConvertEventType.END,
        fileData: <Uint8Array>(
          await this.ffmpeg.readFile(this.currentFile!.targetFileName!)
        ),
        targetFormat: this.currentFile!.targetFormat,
      });

      // free up the buffer memory
      this.ffmpeg.deleteFile(this.currentFile!.targetFileName!);
      this.ffmpeg.deleteFile(this.currentFile!.name);

      this.currentFile = undefined;
      this.isConverting = false;

      /**
       * if file queue is not empty then schedule next file for conversion
       */
      if (!this.fileQueue.isEmpty() && !this.isConverting) {
        this.isConverting = true;
        const videoFileData: VideoFileData = this.fileQueue.dequeue();
        this.currentFile = videoFileData;
        this.convertVideoFile(videoFileData);
      }
    }
  }

  /**
   * get file name without extension
   * @param fileName
   * @returns
   */
  getPlainFileName(fileName: string): string {
    return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  }

  /**
   * build ffmpeg command from specified command type and arguments
   * @param targetFormat
   * @param args
   * @returns
   */
  buildFFMpegCommand(targetFormat: string, args: string[]): string[] {
    const mediaType = this.getMediaType(targetFormat);
    let command = FFMPEG_OUTPUT_CONFIG[mediaType].find(
      config => config.targetFormat === targetFormat
    )?.command!;
    for (let i = 0; i < args.length; i++) {
      command = command.split(`{${i}}`).join(args[i]);
    }
    return command.split(' ');
  }

  /**
   * submit file to convert
   * @param videoFileData
   * @param retry
   */
  async submitFileToConvert(
    videoFileData: VideoFileData,
    retry: boolean = false
  ): Promise<void> {
    if (
      !retry &&
      this.fileMap.has(videoFileData.id) &&
      this.fileMap.get(videoFileData.id) === videoFileData.targetFormat
    ) {
      LogUtils.info(`file has already been submitted`);
      return;
    }

    this.fileQueue.enqueue(videoFileData);
    this.fileMap.set(videoFileData.id, videoFileData.targetFormat);

    if (!this.isConverting) {
      this.isConverting = true;
      const nextFile: VideoFileData = this.fileQueue.dequeue();
      this.currentFile = nextFile;
      this.convertVideoFile(nextFile);
    }
  }

  /**
   * convert video file
   * @param videoFileData
   */
  async convertVideoFile(videoFileData: VideoFileData): Promise<void> {
    this.ffmpegStateEvent.emit({
      fileId: videoFileData.id,
      status: 'initializing',
    });

    await this.initializeFFMpeg();

    this.ffmpegStateEvent.emit({
      fileId: videoFileData.id,
      status: 'ready',
    });

    /**
     * load file in ffmpeg buffer
     */
    await this.writeFileInFFMpegBuffer(videoFileData);

    /**
     * build converted file name
     */
    videoFileData.targetFileName = `${this.getPlainFileName(
      videoFileData.name
    )}_converted.${videoFileData.targetFormat}`;

    /**
     * prepare ffmpeg command
     */
    const ffmpegCommand: string[] = this.buildFFMpegCommand(
      videoFileData.targetFormat,
      [videoFileData.name, videoFileData.targetFileName]
    );

    LogUtils.info(`running ffmpeg commad - ${ffmpegCommand.join(' ')}`);

    /**
     * initiate video file conversion process by running command
     */
    await this.ffmpeg.exec(ffmpegCommand);
  }

  /**
   * write video file in ffmpeg buffer
   * @param videoFileData
   */
  async writeFileInFFMpegBuffer(videoFileData: VideoFileData): Promise<void> {
    await this.ffmpeg.writeFile(
      videoFileData.name,
      await fetchFile(videoFileData.file)
    );

    /**
     * emit file loaded event
     */
    this.fileLoadedEvent.emit({
      fileId: videoFileData.id,
      loaded: true,
    });
  }

  /**
   * write video file in ffmpeg buffer
   * @param fileName
   */
  async readFileInFFMpegBuffer(fileName: string): Promise<Uint8Array> {
    return <Uint8Array>await this.ffmpeg.readFile('readFile', fileName);
  }

  /**
   * get media type
   * @param targetFormat
   */
  getMediaType(targetFormat: string): FFMpegMediaFormatType {
    let config: FFMpegMediaFormatConfig | undefined;
    config = FFMPEG_OUTPUT_CONFIG.audio.find(
      mediaConfig => mediaConfig.targetFormat === targetFormat
    );
    if (config) {
      return FFMpegMediaFormatType.AUDIO;
    }
    return FFMpegMediaFormatType.VIDEO;
  }
}
