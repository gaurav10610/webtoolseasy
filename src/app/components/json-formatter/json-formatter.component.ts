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
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';
import { DOCUMENT } from '@angular/common';
import { componentConfig } from 'src/environments/component-config/json-formatter/config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss'],
})
export class JsonFormatterComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  appId: string = 'jsonformatter';
  isJsonValid: boolean = true;

  @ViewChild('text1AreaContent', { static: false })
  text1AreaContent!: ElementRef;

  @ViewChild('text2AreaContent', { static: false })
  text2AreaContent!: ElementRef;

  rawJson: string = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
  tabSpaceValue: string = '   ';

  constructor(
    private clipboard: Clipboard,
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
  }

  ngOnInit(): void {
    LogUtils.info('json formatter: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('json formatter: ngAfterViewInit');
    const formattedJson = JSON.stringify(
      JSON.parse(this.rawJson),
      null,
      this.tabSpaceValue
    );
    this.updateRawJson(this.rawJson);
    this.updateFormattedJson(formattedJson);
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
      const formattedJson = JSON.stringify(
        JSON.parse(rawJsonValue),
        null,
        this.tabSpaceValue
      );
      this.isJsonValid = true;
      this.updateFormattedJson(formattedJson);
    } catch (error) {
      LogUtils.error(`error occured while decoding token: ${this.rawJson}`);
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

  updateFormattedJson(formattedJson: string) {
    this.renderer.setProperty(
      this.text2AreaContent.nativeElement,
      'innerText',
      formattedJson
    );
  }

  copyFormattedJson() {
    this.clipboard.copy(this.text2AreaContent.nativeElement.innerText);
  }

  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
}
