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
import { html_beautify } from 'js-beautify';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/html-formatter/config';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-html-formatter',
  templateUrl: './html-formatter.component.html',
  styleUrls: ['./html-formatter.component.scss'],
})
export class HtmlFormatterComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  appId: string = 'htmlformatter';

  @ViewChild('text1AreaContent', { static: false })
  text1AreaContent!: ElementRef;

  @ViewChild('text2AreaContent', { static: false })
  text2AreaContent!: ElementRef;

  rawHtml: string =
    '<html><head><title>Example of Paragraph tag</title></head><body><p>webtoolseasy is awesome!</p></p></body></html>';

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
    this.appContextService.descrptionData = descriptionData;
  }

  ngOnInit(): void {
    LogUtils.info('html formatter component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('html formatter component: ngAfterViewInit');
    this.updateRawHtml(this.rawHtml);
    const formattedHtml = html_beautify(this.rawHtml);
    this.updateFormattedHtml(formattedHtml);
  }

  updateRawHtml(rawHtml: string) {
    this.renderer.setProperty(
      this.text1AreaContent.nativeElement,
      'innerText',
      rawHtml
    );
  }

  updateFormattedHtml(formattedHtml: string) {
    this.renderer.setProperty(
      this.text2AreaContent.nativeElement,
      'innerText',
      formattedHtml
    );
  }

  formatHtml(rawHtmlValue: string) {
    try {
      this.rawHtml = rawHtmlValue;
      const formattedHtml = html_beautify(rawHtmlValue);
      this.updateFormattedHtml(formattedHtml);
    } catch (e) {
      LogUtils.error(`error occured while decoding token: ${rawHtmlValue}`);
    }
  }

  rawHtmlChange() {
    this.formatHtml(this.text1AreaContent.nativeElement.innerText);
  }

  onHtmlPaste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');
    this.updateRawHtml(pastedData);
    this.formatHtml(pastedData);
  }

  copyFormattedHtml() {
    this.clipboard.copy(this.text2AreaContent.nativeElement.innerText);
  }

  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
}
