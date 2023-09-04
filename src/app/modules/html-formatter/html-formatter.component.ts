import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/html-formatter/config';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { html_beautify } from 'js-beautify';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Component({
  selector: 'app-html-formatter',
  templateUrl: './html-formatter.component.html',
  styleUrls: ['./html-formatter.component.scss'],
})
export class HtmlFormatterComponent {
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

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    public platformMetadataService: PlatformMetadataService
  ) {
    this.formattedCode = html_beautify(this.rawCode);
  }

  onRawCodeChange(updatedModel: string) {
    this.formattedCode = html_beautify(updatedModel);
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
