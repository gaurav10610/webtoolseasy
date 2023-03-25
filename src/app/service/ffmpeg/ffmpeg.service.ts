import { EventEmitter, Injectable } from '@angular/core';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
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
  ffmpegLoadedEvent!: EventEmitter<FFMpegLoadingStatus>;

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
    this.ffmpegLoadedEvent = new EventEmitter();
  }

  async initializeFFMpeg() {
    this.ffmpeg = createFFmpeg({
      log: false,
    });

    this.ffmpeg.setLogger(this.handleLogs.bind(this));

    this.ffmpeg.setProgress(this.handleFFMpegProgress.bind(this));
    await this.ffmpeg.load();
  }

  async flushBuffer() {
    if (this.ffmpeg && this.ffmpeg.isLoaded()) {
      const files: string[] = this.ffmpeg.FS('readdir', '/');
      files.forEach(fileName => this.ffmpeg.FS('unlink', fileName));
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
      this.ffmpeg.FS('unlink', this.currentFile!.targetFileName!);
      this.ffmpeg.FS('unlink', this.currentFile!.name);

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
  handleFFMpegProgress(progressParams: any) {
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
        fileData: this.ffmpeg.FS('readFile', this.currentFile!.targetFileName!),
        targetFormat: this.currentFile!.targetFormat,
      });

      // free up the buffer memory
      this.ffmpeg.FS('unlink', this.currentFile!.targetFileName!);
      this.ffmpeg.FS('unlink', this.currentFile!.name);

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
    this.ffmpegLoadedEvent.emit({
      fileId: videoFileData.id,
      status: 'initializing',
    });

    await this.initializeFFMpeg();

    this.ffmpegLoadedEvent.emit({
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
    await this.ffmpeg.run(...ffmpegCommand);
  }

  /**
   * write video file in ffmpeg buffer
   * @param videoFileData
   */
  async writeFileInFFMpegBuffer(videoFileData: VideoFileData): Promise<void> {
    this.ffmpeg.FS(
      'writeFile',
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
    return this.ffmpeg.FS('readFile', fileName);
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
