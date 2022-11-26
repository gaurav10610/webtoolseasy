import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileData, FileDataType } from 'src/app/@types/file';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { AppIconService } from 'src/app/service/icon/app-icon.service';
import { LogUtils } from 'src/app/service/util/logger';
import { v4 } from 'uuid';

@Component({
  selector: 'app-image-compression',
  templateUrl: './image-compression.component.html',
  styleUrls: ['./image-compression.component.scss'],
})
export class ImageCompressionComponent extends BaseComponent implements OnInit {
  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    appIconService: AppIconService,
    titleService: Title,
    metaService: Meta,
    private renderer: Renderer2
  ) {
    super(router, configService, contextService, titleService, metaService);
    this.contextService.setCurrentAppId('imagecompress');
    this.updatePageMetaData();
    this.tags = <string[]>(
      this.configService.getApplicationConfig(
        this.contextService.getCurrentAppId()
      )?.tags
    );
  }

  fileList: FileData[] = [];

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  ngOnInit(): void {
    LogUtils.info('image compression component has rendered');
  }

  async openFileDialog() {
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
  }

  async selectFiles(event: any) {
    for (const file of event.target.files) {
      this.fileList.push({
        id: v4(),
        file: file,
        type: FileDataType.IMAGE,
        isCompressed: false,
        name: file.name,
        isValid: this.isValidFileFormat(file),
      });
    }
  }

  async startCompressAll() {
    this.fileList
      .filter(fileData => fileData.isValid)
      .forEach(fileData => this.compressImage(fileData));
  }

  async compressImage(fileData: FileData) {
    fileData.isCompressed = true;
  }

  isValidFileFormat(file: File): boolean {
    return true;
  }

  showInfo(fileData: FileData) {}
}
