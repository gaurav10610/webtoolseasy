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
import { css_beautify } from 'js-beautify';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { cssformatter as componentConfig } from 'src/environments/component-config';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-css-formatter',
  templateUrl: './css-formatter.component.html',
  styleUrls: ['./css-formatter.component.scss'],
})
export class CssFormatterComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  appId: string = 'cssformatter';

  @ViewChild('rawCssDiv', { static: false })
  rawCssDiv!: ElementRef;

  rawCss: string = `@media screen and (min-width:735px){.encoded-token-field{margin-right:30px}}@media screen and (max-width:735px){.token-area-container{flex-direction:column}.encoded-token-field{margin-bottom:20px}}.token-parent-div{width:40%;height:30em}`;
  formattedCss: string = '';

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
    LogUtils.info('css formatter component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('css formatter component: ngAfterViewInit');
    this.updateRawCss(this.rawCss);
    this.formattedCss = css_beautify(this.rawCss);
  }

  updateRawCss(rawCss: string) {
    this.renderer.setProperty(
      this.rawCssDiv.nativeElement,
      'innerText',
      rawCss
    );
  }

  formatCss(rawCssValue: string) {
    try {
      this.rawCss = rawCssValue;
      this.formattedCss = css_beautify(rawCssValue);
    } catch (e) {
      LogUtils.error(`error occured while decoding token: ${rawCssValue}`);
    }
  }

  rawCssChange() {
    this.formatCss(this.rawCssDiv.nativeElement.innerText);
  }

  onCssPaste(event: any) {
    event.preventDefault();
    const pastedData = (
      event.clipboardData || (<any>window).clipboardData
    ).getData('text');
    this.updateRawCss(pastedData);
    this.formatCss(pastedData);
  }

  copyFormattedCss() {
    this.clipboard.copy(this.formattedCss);
  }
}
