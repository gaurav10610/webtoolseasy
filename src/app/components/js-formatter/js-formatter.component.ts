import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { AppIconService } from 'src/app/service/icon/app-icon.service';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';
import { js_beautify } from 'js-beautify';

@Component({
  selector: 'app-js-formatter',
  templateUrl: './js-formatter.component.html',
  styleUrls: ['./js-formatter.component.scss'],
})
export class JsFormatterComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  appId: string = 'jsformatter';

  @ViewChild('rawJsDiv', { static: false })
  rawJsDiv!: ElementRef;
  @ViewChild('formattedJsDiv', { static: false })
  formattedJsDiv!: ElementRef;

  rawJs: string = `if(value==='webtoolseasy'){formatjs();}else{console.log('this is awesome');}`;
  formattedJs: string = '';

  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    private clipboard: Clipboard,
    appIconService: AppIconService,
    private renderer: Renderer2,
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: any
  ) {
    super(
      router,
      configService,
      contextService,
      titleService,
      metaService,
      document
    );

    this.contextService.setCurrentAppId('jsformatter');
    this.updatePageMetaData();
    this.tags = <string[]>(
      this.configService.getApplicationConfig(
        this.contextService.getCurrentAppId()
      )?.tags
    );
  }

  ngOnInit(): void {
    LogUtils.info('js formatter component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('js formatter component: ngAfterViewInit');
    this.updateRawJs(this.rawJs);
    this.formattedJs = js_beautify(this.rawJs);
    this.updateFormattedJs(this.formattedJs);
  }

  updateRawJs(rawJs: string) {
    this.renderer.setProperty(this.rawJsDiv.nativeElement, 'innerText', rawJs);
  }

  updateFormattedJs(formattedJs: string) {
    this.renderer.setProperty(
      this.formattedJsDiv.nativeElement,
      'innerHTML',
      `<pre>${formattedJs}</pre>`
    );
  }

  formatJs(rawJsValue: string) {
    try {
      this.rawJs = rawJsValue;
      this.formattedJs = js_beautify(rawJsValue);
      this.updateFormattedJs(this.formattedJs);
    } catch (e) {
      LogUtils.error(`error occured while decoding token: ${rawJsValue}`);
    }
  }

  rawJsChange() {
    LogUtils.info(
      `raw js has changed with value: ${this.rawJsDiv.nativeElement.innerText}`
    );
    this.formatJs(this.rawJsDiv.nativeElement.innerText);
  }

  onJsPaste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');
    this.updateRawJs(pastedData);
    this.formatJs(pastedData);
  }

  copyFormattedJs() {
    this.clipboard.copy(this.formattedJs);
  }
}
