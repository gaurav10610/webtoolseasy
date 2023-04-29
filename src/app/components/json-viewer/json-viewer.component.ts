import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
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
import { descriptionData } from 'src/environments/component-config/css-formatter/config';
import { componentConfig } from 'src/environments/component-config/json-viewer/config';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss'],
})
export class JsonViewerComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  appId: string = 'jsonviewer';
  isJsonValid: boolean = true;

  @ViewChild('text1AreaContent', { static: false })
  text1AreaContent!: ElementRef;

  rawJson: string = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
  tabSpaceValue: string = '   ';
  formattedJSON = JSON.parse(this.rawJson);

  constructor(
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private appContextService: AppContextService
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
    this.appContextService.relatedTools = componentConfig.relatedTools;
    this.appContextService.descrptionData = descriptionData;
  }

  ngOnInit(): void {
    LogUtils.info('json viewer: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('json viewer: ngAfterViewInit');
    this.updateRawJson(this.rawJson);
  }

  rawJsonChange() {
    this.formatJson(this.text1AreaContent.nativeElement.innerText);
  }

  onJsonPaste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');
    this.updateRawJson(pastedData);
    this.formatJson(pastedData);
  }

  formatJson(rawJsonValue: string) {
    try {
      this.rawJson = rawJsonValue;
      this.isJsonValid = true;
      this.updateJsonTree(rawJsonValue);
    } catch (error) {
      LogUtils.error(`error occured while formatting json: ${this.rawJson}`);
      this.isJsonValid = false;
    }
  }

  updateRawJson(rawJson: string) {
    this.renderer.setProperty(
      this.text1AreaContent.nativeElement,
      'innerText',
      rawJson
    );
  }

  updateJsonTree(formattedJson: string) {
    this.formattedJSON = JSON.parse(formattedJson);
  }

  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
}
