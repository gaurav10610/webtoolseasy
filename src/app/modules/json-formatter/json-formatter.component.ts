import { Component, Inject } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { DOCUMENT } from '@angular/common';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/json-formatter/config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss'],
})
export class JsonFormatterComponent {
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
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private appContextService: AppContextService,
    private metaConfigService: MetaConfigService,
    private iconConfigService: IconConfigService,
    public platformMetadataService: PlatformMetadataService
  ) {
    this.iconConfigService.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer,
      this.appContextService
    );
    this.metaConfigService.updatePageMetaData(
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
    this.formattedCode = JSON.stringify(
      JSON.parse(this.rawCode),
      null,
      this.tabSpaceValue
    );
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
