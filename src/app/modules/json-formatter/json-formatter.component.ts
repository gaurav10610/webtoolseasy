import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/json-formatter/config';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

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

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    public platformMetadataService: PlatformMetadataService
  ) {
    this.formattedCode = JSON.stringify(
      JSON.parse(this.rawCode),
      null,
      this.tabSpaceValue
    );
  }

  onRawCodeChange(updatedModel: string) {
    this.formattedCode = JSON.stringify(
      JSON.parse(updatedModel),
      null,
      this.tabSpaceValue
    );
  }

  copyFormattedCode() {
    this.clipboard.copy(this.formattedCode);
  }
}
