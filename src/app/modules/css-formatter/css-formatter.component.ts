import { Component } from '@angular/core';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/css-formatter/config';
import { Clipboard } from '@angular/cdk/clipboard';
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
    fontSize: 15,
  };

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    public platformMetaDataService: PlatformMetadataService
  ) {
    this.formattedCode = css_beautify(this.rawCode);
  }

  onRawCodeChange(updatedModel: string) {
    this.formattedCode = css_beautify(updatedModel);
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
