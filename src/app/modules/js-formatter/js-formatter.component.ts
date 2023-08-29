import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/js-formatter/config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { js_beautify } from 'js-beautify';

@Component({
  selector: 'app-js-formatter',
  templateUrl: './js-formatter.component.html',
  styleUrls: ['./js-formatter.component.scss'],
})
export class JsFormatterComponent {
  rawCode: string = `if(value==='webtoolseasy'){formatjs();}else{console.log('this is awesome');}`;

  formattedCode!: string;

  /**
   * monaco editor options
   */
  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
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
    this.formattedCode = js_beautify(this.rawCode);
  }

  onRawCodeChange(updatedModel: string) {
    this.formattedCode = js_beautify(updatedModel);
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
