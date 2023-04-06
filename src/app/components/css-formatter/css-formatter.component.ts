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
import { componentConfig } from 'src/environments/component-config/css-formatter/config';
import { Clipboard } from '@angular/cdk/clipboard';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

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

  @ViewChild('text1AreaContent', { static: false })
  text1AreaContent!: ElementRef;

  @ViewChild('text2AreaContent', { static: false })
  text2AreaContent!: ElementRef;

  rawCss: string = `@media screen and (min-width:735px){.encoded-token-field{margin-right:30px}}@media screen and (max-width:735px){.token-area-container{flex-direction:column}.encoded-token-field{margin-bottom:20px}}.token-parent-div{width:40%;height:30em}`;

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
    LogUtils.info('css formatter component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('css formatter component: ngAfterViewInit');
    this.updateRawCss(this.rawCss);
    const formattedCss = css_beautify(this.rawCss);
    this.updateFormattedCss(formattedCss);
  }

  updateRawCss(rawCss: string) {
    this.renderer.setProperty(
      this.text1AreaContent.nativeElement,
      'innerText',
      rawCss
    );
  }

  updateFormattedCss(formattedCss: string) {
    this.renderer.setProperty(
      this.text2AreaContent.nativeElement,
      'innerText',
      formattedCss
    );
  }

  formatCss(rawCssValue: string) {
    try {
      this.rawCss = rawCssValue;
      const formattedCss = css_beautify(rawCssValue);
      this.updateFormattedCss(formattedCss);
    } catch (e) {
      LogUtils.error(`error occured while decoding token: ${rawCssValue}`);
    }
  }

  rawCssChange() {
    this.formatCss(this.text1AreaContent.nativeElement.innerText);
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
    this.clipboard.copy(this.text2AreaContent.nativeElement.innerText);
  }

  onEncodedDivClick() {
    this.text1AreaContent.nativeElement.focus();
  }
}
