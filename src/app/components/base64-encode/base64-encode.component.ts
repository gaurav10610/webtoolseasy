import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { LogUtils } from 'src/app/service/util/logger';
import { descriptionData } from 'src/environments/component-config/base64-encode/config';
import { componentConfig } from 'src/environments/component-config/base64-encode/config';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-base64-encode',
  templateUrl: './base64-encode.component.html',
  styleUrls: ['./base64-encode.component.scss'],
})
export class Base64EncodeComponent extends BaseComponent implements OnInit {
  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  typeDefination: string | undefined;

  // base64 data
  base64Data: string | undefined;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private appContextService: AppContextService,
    private clipboard: Clipboard
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
    this.appContextService.descrptionData = descriptionData;
  }

  ngOnInit(): void {
    LogUtils.info('base64 encode component has rendered');
  }

  async openFileDialog() {
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
  }

  async selectFiles(event: any) {
    this.encodeFileToBase64(event.target.files[0]);
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
        .forEach(async file => await this.encodeFileToBase64(file));
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach(
        async file => await this.encodeFileToBase64(file)
      );
    }
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
   * encode file to base64
   * @param file
   */
  async encodeFileToBase64(file: File) {
    const fileReader: FileReader = new FileReader();

    fileReader.addEventListener(
      'load',
      () => {
        this.base64Data = <string>fileReader.result;
      },
      false
    );

    fileReader.readAsDataURL(file);
  }

  /**
   * copy base64 data
   * @param type
   */
  copyBase64Data(type: string) {
    if (type === 'base64') {
      this.clipboard.copy(<string>this.base64Data?.split(',')[1]);
    } else if (type === 'uri') {
      this.clipboard.copy(<string>this.base64Data);
    }
  }
}
