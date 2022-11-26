import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { AppIconService } from 'src/app/service/icon/app-icon.service';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss'],
})
export class JsonFormatterComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    private clipboard: Clipboard,
    appIconService: AppIconService,
    private renderer: Renderer2,
    titleService: Title,
    metaService: Meta
  ) {
    super(router, configService, contextService, titleService, metaService);
    this.contextService.setCurrentAppId('jsonformatter');
    this.updatePageMetaData();
    this.tags = <string[]>(
      this.configService.getApplicationConfig(
        this.contextService.getCurrentAppId()
      )?.tags
    );
  }

  isJsonValid: boolean = true;

  @ViewChild('rawJsonDiv', { static: false })
  rawJsonDiv!: ElementRef;
  @ViewChild('formattedJsonDiv', { static: false })
  formattedJsonDiv!: ElementRef;

  rawJson: string = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
  formattedJson: string = '';
  tabSpaceValue: string = '   ';

  ngOnInit(): void {
    LogUtils.info('json formatter componet has rendered');
  }

  ngAfterViewInit(): void {
    /**
     * format default json
     */
    this.formattedJson = JSON.stringify(
      JSON.parse(this.rawJson),
      null,
      this.tabSpaceValue
    );
    this.updateRawJson(this.rawJson);
    this.updateFormattedJson(this.formattedJson);
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
      this.updateFormattedJson(this.formattedJson);
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

  updateFormattedJson(formattedJson: string) {
    this.renderer.setProperty(
      this.formattedJsonDiv.nativeElement,
      'innerHTML',
      `<pre>${formattedJson}</pre>`
    );
  }

  copyFormattedJson() {
    this.clipboard.copy(this.formattedJson);
  }
}
