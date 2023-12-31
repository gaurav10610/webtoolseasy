import { EventEmitter, Injectable } from '@angular/core';
import {
  ConvertEvent,
  ConvertEventType,
  ConvertLogEvent,
  ConvertProgressEvent,
  FFMpegLoadingStatus,
  FileLoadedEvent,
} from 'src/app/@types/ffmpeg';
import { VideoFileData } from 'src/app/@types/file';
import { QueueStorage } from 'src/app/custom-datastructures/QueueStorage';
import {
  FFMPEG_COMMANDS,
  FFMPEG_FORMATS,
} from 'src/environments/ffmpeg-config';
import { LogUtils } from 'src/app/service/util/logger';
import { FFmpeg } from 'src/app/service/ffmpeg/lib/ffmpeg';
import { fetchFile, toBlobURL } from 'src/app/service/ffmpeg/lib/util';
import {
  LogEvent,
  ProgressEvent,
} from 'src/app/service/ffmpeg/lib/ffmpeg/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  private ffmpeg!: FFmpeg;

  /**
   * queue data structure to hold the submitted files
   */
  private fileQueue!: QueueStorage<VideoFileData>;
  private isConverting = false;
  private currentFile: VideoFileData | undefined = undefined;

  /**
   * fileId -> targetFormat
   */
  private fileMap!: Map<string, number>;

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

  /**
   * initialize/load ffmpeg wasm binary
   *
   */
  async initializeFFMpeg() {
    this.ffmpeg = new FFmpeg();

    this.ffmpeg.on('log', this.handleLogs.bind(this));
    this.ffmpeg.on('progress', this.handleFFMpegProgress.bind(this));

    await this.ffmpeg.load({
      coreURL: await toBlobURL(
        `${environment.ffmpegBaseUrl}/ffmpeg-core.js`,
        'text/javascript'
      ),
      wasmURL: await toBlobURL(
        `${environment.ffmpegBaseUrl}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
      workerURL: await toBlobURL(
        `${environment.ffmpegBaseUrl}/ffmpeg-core.worker.js`,
        'text/javascript'
      ),
    });
  }

  /**
   * flush ffmpeg file system and terminate ffmpeg instance
   */
  async flushBuffer() {
    if (this.ffmpeg && this.ffmpeg.loaded) {
      this.ffmpeg.terminate();
    }
  }

  /**
   * handle conversion logs
   * @param logParams
   */
  async handleLogs(logParams: LogEvent) {
    this.convertLogEvent.emit({
      ...logParams,
    });
  }

  /**
   * handle file conversion failure
   */
  async handleConversionFailure(): Promise<void> {
    /**
     * emit conversion failed event
     */
    this.convertEvent.emit({
      fileId: this.currentFile!.id,
      type: ConvertEventType.FAILED,
      targetFormat: this.currentFile!.targetFormat,
    });

    // free up the buffer memory
    await this.ffmpeg.deleteFile(this.currentFile!.name);

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

  /**
   * handles file progress
   * @param progressParams
   */
  async handleFFMpegProgress(progressParams: ProgressEvent) {
    const progress: number = Number((progressParams.progress * 100).toFixed(2));
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
      await this.ffmpeg.deleteFile(this.currentFile!.targetFileName!);
      await this.ffmpeg.deleteFile(this.currentFile!.name);

      this.ffmpeg.terminate();

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
  buildFFMpegCommand(
    fileFormat: number,
    targetFormat: number,
    args: string[]
  ): string[] {
    let command;

    /**
     * check if the default command has been overridden based on input file format
     *
     * if not then use default command
     */
    if (FFMPEG_COMMANDS.get(targetFormat)!.has(fileFormat)) {
      command = FFMPEG_COMMANDS.get(targetFormat)!.get(fileFormat)!;
    } else {
      command = FFMPEG_COMMANDS.get(targetFormat)!.get(0)!;
    }

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
    )}_converted.${
      FFMPEG_FORMATS.get(videoFileData.targetFormat)!.targetFormat
    }`;

    /**
     * prepare ffmpeg command
     */
    const ffmpegCommand: string[] = this.buildFFMpegCommand(
      videoFileData.fileFormat!,
      videoFileData.targetFormat,
      [videoFileData.name, videoFileData.targetFileName]
    );

    LogUtils.info(`[FFMPEG Command]: ${ffmpegCommand.join(' ')}`);

    /**
     * initiate video file conversion process by running command
     */
    const result = await this.ffmpeg.exec(ffmpegCommand);
    if (result !== 0) {
      this.handleConversionFailure();
    }
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
    return <Uint8Array>await this.ffmpeg.readFile(fileName);
  }
}
