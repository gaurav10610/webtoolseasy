import { Component } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { importScript } from 'src/app/service/ffmpeg/lib/util';
import { environment } from 'src/environments/environment';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/markdown-editor/config';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: [
    './markdown-editor.component.scss',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../../node_modules/font-awesome/css/font-awesome.min.css',
    '../../../../node_modules/ngx-markdown-editor/assets/highlight.js/agate.min.css',
  ],
})
export class MarkdownEditorComponent {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(public platformMetaDataService: PlatformMetadataService) {
    if (platformMetaDataService.isPlatformBrowser) {
      importScript(
        `${environment.hostname}/assets/highlight.js/highlight.min.js`
      );
      importScript(`${environment.hostname}/assets/marked.min.js`);
      importScript(`${environment.hostname}/assets/ace-builds/ace.js`);
    }
  }
}
