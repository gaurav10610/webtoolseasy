import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
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
  rawCode: string =
    '<html><head><title>Online HTML Formatter</title></head><body><p>webtoolseasy is awesome!</p></p></body></html>';

  formattedCode!: string;

  /**
   * monaco editor options
   */
  editorOptions = {
    theme: 'vs-dark',
    language: 'html',
    fontSize: 17,
  };

  constructor(
    private clipboard: Clipboard,
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
      this.platformId,
      this.appContextService
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
    this.formattedCode = html_beautify(this.rawCode);
  }

  ngAfterViewInit(): void {
    LogUtils.info('html formatter component: ngAfterViewInit');
  }

  onRawCodeChange() {
    this.formattedCode = html_beautify(this.rawCode);
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
