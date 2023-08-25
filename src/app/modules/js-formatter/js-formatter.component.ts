import { DOCUMENT } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { js_beautify } from 'js-beautify';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/js-formatter/config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-js-formatter',
  templateUrl: './js-formatter.component.html',
  styleUrls: ['./js-formatter.component.scss'],
})
export class JsFormatterComponent extends BaseComponent {
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
    this.formattedCode = js_beautify(this.rawCode);
  }

  onRawCodeChange() {
    this.formattedCode = js_beautify(this.rawCode);
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
