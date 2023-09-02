import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/css-formatter/config';
import { Clipboard } from '@angular/cdk/clipboard';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { css_beautify } from 'js-beautify';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Component({
  selector: 'app-css-formatter',
  templateUrl: './css-formatter.component.html',
  styleUrls: ['./css-formatter.component.scss'],
})
export class CssFormatterComponent {
  rawCode: string = `@media screen and (min-width:735px){.encoded-token-field{margin-right:30px}}@media screen and (max-width:735px){.token-area-container{flex-direction:column}.encoded-token-field{margin-bottom:20px}}.token-parent-div{width:40%;height:30em}`;

  formattedCode!: string;

  /**
   * monaco editor options
   */
  editorOptions = {
    theme: 'vs-dark',
    language: 'css',
    fontSize: 17,
  };

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private metaConfigService: MetaConfigService,
    private iconConfigService: IconConfigService,
    public platformMetadataService: PlatformMetadataService
  ) {
    this.iconConfigService.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer
    );
    this.metaConfigService.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
    this.formattedCode = css_beautify(this.rawCode);
  }

  onRawCodeChange(updatedModel: string) {
    this.formattedCode = css_beautify(updatedModel);
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
