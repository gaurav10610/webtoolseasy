import { AfterViewInit, Component, Inject } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { importScript } from 'src/app/service/ffmpeg/lib/util';
import { DOCUMENT } from '@angular/common';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/markdown-editor/config';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

declare var EasyMDE: any;

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent implements AfterViewInit {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    public platformMetaDataService: PlatformMetadataService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngAfterViewInit(): void {
    if (this.platformMetaDataService.isPlatformBrowser) {
      importScript(
        'https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js'
      ).then(() => {
        const easyMDE = new EasyMDE({
          element: this.document.getElementById('my-text-area'),
        });
      });
    }
  }
}
