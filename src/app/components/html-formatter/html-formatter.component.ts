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
import { htmlformatter as componentConfig } from 'src/environments/component-config';
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

  @ViewChild('rawHtmlDiv', { static: false })
  rawHtmlDiv!: ElementRef;
  @ViewChild('formattedHtmlDiv', { static: false })
  formattedHtmlDiv!: ElementRef;

  rawHtml: string =
    '<html><head><title>Example of Paragraph tag</title></head><body><p>webtoolseasy is awesome!</p></p></body></html>';
  formattedHtml: string = '';

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
    LogUtils.info('html formatter component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('html formatter component: ngAfterViewInit');
    this.updateRawHtml(this.rawHtml);
    this.formattedHtml = html_beautify(this.rawHtml);
  }

  updateRawHtml(rawHtml: string) {
    this.renderer.setProperty(
      this.rawHtmlDiv.nativeElement,
      'innerText',
      rawHtml
    );
  }

  formatHtml(rawHtmlValue: string) {
    try {
      this.rawHtml = rawHtmlValue;
      this.formattedHtml = html_beautify(rawHtmlValue);
    } catch (e) {
      LogUtils.error(`error occured while decoding token: ${rawHtmlValue}`);
    }
  }

  rawHtmlChange() {
    this.formatHtml(this.rawHtmlDiv.nativeElement.innerText);
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
    this.clipboard.copy(this.formattedHtml);
  }
}
