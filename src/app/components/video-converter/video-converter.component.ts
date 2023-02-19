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
    private breakpointObserver: BreakpointObserver
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
  }

  ngOnInit(): void {
    LogUtils.info('video converter: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('video converter: ngAfterViewInit');
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
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
   * add file to convert
   * @param file
   */
  async addFileToConvert(file: File) {
    this.zoneRef.run(() => {
      this.fileList.push({
        id: v4(),
        file: file,
        inProgress: false,
        type: FileDataType.VIDEO,
        name: file.name,
        isValid: this.isValidFileFormat(file),
        convertProgress: 0,
        error: this.isValidFileFormat(file) ? undefined : this.ERROR_MESSAGE,
      });
    });
  }

  /**
   * validate if video file is of valid format or not
   * @param file
   * @returns
   */
  isValidFileFormat(file: File): boolean {
    return true;
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
