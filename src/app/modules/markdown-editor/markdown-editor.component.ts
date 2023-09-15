import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { importScript } from 'src/app/service/ffmpeg/lib/util';
import { DOCUMENT } from '@angular/common';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/markdown-editor/config';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { Clipboard } from '@angular/cdk/clipboard';

declare var EasyMDE: any;

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent implements AfterViewInit {
  @ViewChild('editor', { static: false })
  editor!: ElementRef;

  mdEditor: any;

  initialValue: string = `
  * **Online Markdown Editor**
  * **ReadME Editor**
  * **GitHub ReadME**
  * **Bitbucket ReadME**
  
  
  [WebToolsEasy](https://webtoolseasy.com/tools) - Free web tools to make work super easy`;

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  editorConfig = {
    toolbar: [
      'bold',
      'italic',
      'heading',
      'strikethrough',
      '|',
      'code',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      'image',
      'table',
      'horizontal-rule',
      '|',
      'side-by-side',
      'fullscreen',
    ],
  };

  constructor(
    public platformMetaDataService: PlatformMetadataService,
    @Inject(DOCUMENT) private document: any,
    private clipboard: Clipboard
  ) {}

  ngAfterViewInit(): void {
    if (this.platformMetaDataService.isPlatformBrowser) {
      importScript(
        'https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js'
      ).then(() => {
        this.mdEditor = new EasyMDE({
          element: this.editor.nativeElement,
          toolbar: [
            {
              name: 'toggle-preview',
              action: EasyMDE.togglePreview,
              text: 'Preview',
              title: 'Preview Button',
            },
            ...this.editorConfig.toolbar,
          ],
        });
        this.mdEditor.value(this.initialValue);
      });
    }
  }

  copyMarkdownData() {
    this.clipboard.copy(this.mdEditor.value());
  }
}
