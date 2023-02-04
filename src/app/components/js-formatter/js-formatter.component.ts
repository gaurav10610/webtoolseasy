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
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';
import { js_beautify } from 'js-beautify';
import { jsformatter as componentConfig } from 'src/environments/component-config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

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
  }

  ngOnInit(): void {
    LogUtils.info('js formatter component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('js formatter component: ngAfterViewInit');
    this.updateRawJs(this.rawJs);
    this.formattedJs = js_beautify(this.rawJs);
  }

  updateRawJs(rawJs: string) {
    this.renderer.setProperty(this.rawJsDiv.nativeElement, 'innerText', rawJs);
  }

  formatJs(rawJsValue: string) {
    try {
      this.rawJs = rawJsValue;
      this.formattedJs = js_beautify(rawJsValue);
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
