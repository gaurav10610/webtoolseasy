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
import { jsonformatter as componentConfig } from 'src/environments/component-config';
import { MatIconRegistry } from '@angular/material/icon';

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

  @ViewChild('rawJsonDiv', { static: false })
  rawJsonDiv!: ElementRef;
  @ViewChild('formattedJsonDiv', { static: false })
  formattedJsonDiv!: ElementRef;

  rawJson: string = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
  formattedJson: string = '';
  tabSpaceValue: string = '   ';

  constructor(
    private clipboard: Clipboard,
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string
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
  }

  ngOnInit(): void {
    LogUtils.info('json formatter: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('json formatter: ngAfterViewInit');
    this.formattedJson = JSON.stringify(
      JSON.parse(this.rawJson),
      null,
      this.tabSpaceValue
    );
    this.updateRawJson(this.rawJson);
  }

  rawJsonChange() {
    LogUtils.info(
      `encoded token has changed with value: ${this.rawJsonDiv.nativeElement.innerText}`
    );
    this.formatJson(this.rawJsonDiv.nativeElement.innerText);
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
      this.formattedJson = JSON.stringify(
        JSON.parse(rawJsonValue),
        null,
        this.tabSpaceValue
      );
      this.isJsonValid = true;
    } catch (error) {
      LogUtils.error(`error occured while decoding token: ${this.rawJson}`);
      this.isJsonValid = false;
    }
  }

  updateRawJson(rawJson: string) {
    this.renderer.setProperty(
      this.rawJsonDiv.nativeElement,
      'innerText',
      rawJson
    );
  }

  copyFormattedJson() {
    this.clipboard.copy(this.formattedJson);
  }
}
