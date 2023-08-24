import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { Clipboard } from '@angular/cdk/clipboard';
import { DOCUMENT } from '@angular/common';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/json-formatter/config';
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
  rawCode: string = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;
  tabSpaceValue: string = '   ';
  formattedCode!: string;

  /**
   * monaco editor options
   */
  editorOptions = {
    theme: 'vs-dark',
    language: 'json',
    fontSize: 17,
  };

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
    LogUtils.info('json formatter: ngOnInit');
    this.formattedCode = JSON.stringify(
      JSON.parse(this.rawCode),
      null,
      this.tabSpaceValue
    );
  }

  ngAfterViewInit(): void {
    LogUtils.info('json formatter: ngAfterViewInit');
  }

  onRawCodeChange() {
    this.formattedCode = JSON.stringify(
      JSON.parse(this.rawCode),
      null,
      this.tabSpaceValue
    );
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
