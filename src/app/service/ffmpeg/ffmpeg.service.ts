import { EventEmitter, Injectable } from '@angular/core';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import {
  ConvertEvent,
  ConvertLogEvent,
  ConvertProgressEvent,
  FFMpegCommandType,
  FileLoadedEvent,
} from 'src/app/@types/ffmpeg';
import { VideoFileData } from 'src/app/@types/file';
import { QueueStorage } from 'src/app/custom-datastructures/QueueStorage';
import { FFMPEG_COMMANDS } from 'src/environments/ffmpeg-commands';
import { LogUtils } from '../util/logger';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  private ffmpeg!: FFmpeg;

  /**
   * queue data strcuture to hold the submitted files
   */
  private fileQueue!: QueueStorage<VideoFileData>;
  private context = {
    fileId: '',
    isConverting: false,
  };

  /**
   * fileId -> targetFormat
   */
  private fileMap!: Map<string, string>;

  progressEvent!: EventEmitter<ConvertProgressEvent>;
  convertEvent!: EventEmitter<ConvertEvent>;
  fileLoadedEvent!: EventEmitter<FileLoadedEvent>;
  convertLogEvent!: EventEmitter<ConvertLogEvent>;

  constructor() {}

  initialize() {
    this.fileQueue = new QueueStorage();
    this.fileMap = new Map();

    this.progressEvent = new EventEmitter();
    this.convertEvent = new EventEmitter();
    this.fileLoadedEvent = new EventEmitter();
    this.convertLogEvent = new EventEmitter();

    this.ffmpeg = createFFmpeg({
      log: false,
    });

    this.ffmpeg.setLogger(this.handleLog.bind(this));
    this.ffmpeg.setProgress(this.handleFFMpegProgress.bind(this));

    this.ffmpeg.load();
  }

  exit() {
    this.ffmpeg.exit();
  }

  /**
   * handle ffmpeg log
   * @param logParams
   */
  handleLog(logParams: any) {
    this.convertLogEvent.emit({
      ...logParams,
    });
  }

  /**
   * handles file progress
   * @param progressParams
   */
  handleFFMpegProgress(progressParams: any) {
    const progress: number = progressParams.ratio * 100;
    this.progressEvent.emit({
      fileId: this.context.fileId!,
      progress,
    });

    /**
     * this means, that current file is converted completely so reset the context
     */
    if (progress === 100) {
      this.context.fileId = '';
      this.context.isConverting = false;

      /**
       * if file queue is not empty then schedule next file for conversion
       */
      if (!this.fileQueue.isEmpty() && !this.context.isConverting) {
        this.context.isConverting = true;
        const videoFileData: VideoFileData = this.fileQueue.dequeue();
        this.context.fileId = videoFileData.id;
        this.convertVideoFile(videoFileData);
      }
    }
  }

  /**
   * resolve ffmpeg command type using target media format
   * @param videoFileData
   * @returns
   */
  resolveFFMpegCommandType(videoFileData: VideoFileData): FFMpegCommandType {
    let commandType: FFMpegCommandType;
    switch (videoFileData.targetFormat) {
      case 'mp3':
        commandType = FFMpegCommandType.TO_MP3;
        break;
      case 'mp4':
        commandType = FFMpegCommandType.TO_MP4;
        break;
      case 'webm':
        commandType = FFMpegCommandType.TO_WEBM;
        break;
      default:
        commandType = FFMpegCommandType.TO_MP3;
    }
    return commandType;
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
   * @param commandType
   * @param args
   * @returns
   */
  buildFFMpegCommand(commandType: FFMpegCommandType, args: string[]): string[] {
    let command: string = FFMPEG_COMMANDS[commandType];
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

    if (!this.context.isConverting) {
      this.context.isConverting = true;
      const nextFile: VideoFileData = this.fileQueue.dequeue();
      this.context.fileId = nextFile.id;
      this.convertVideoFile(nextFile);
    }
  }

  /**
   * convert video file
   * @param videoFileData
   */
  async convertVideoFile(videoFileData: VideoFileData): Promise<void> {
    /**
     * resolve ffmpeg command type
     */
    const commandType: FFMpegCommandType =
      this.resolveFFMpegCommandType(videoFileData);

    /**
     * build converted file name
     */
    videoFileData.targetFileName = `${this.getPlainFileName(
      videoFileData.name
    )}-converted.${videoFileData.targetFormat}`;

    /**
     * prepare ffmpeg command
     */
    const ffmpegCommand: string[] = this.buildFFMpegCommand(commandType, [
      videoFileData.name,
      videoFileData.targetFileName,
    ]);

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
}
