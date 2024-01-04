import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  SecurityContext,
  Renderer2,
} from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/markdown-editor/config';
import { Clipboard } from '@angular/cdk/clipboard';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/service/file/file.service';
import * as EasyMDE from 'easymde';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

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
  
  [WebToolsEasy](https://webtoolseasy.com) - Free web tools to make work super easy`;

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  toolbar: any[] = [
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
  ];

  constructor(
    private clipboard: Clipboard,
    private domSanitizer: DomSanitizer,
    private fileService: FileService,
    private renderer: Renderer2,
    private platformService: PlatformMetadataService
  ) {}

  ngAfterViewInit(): void {
    if (this.platformService.isPlatformBrowser) {
      this.mdEditor = new EasyMDE({
        element: this.editor.nativeElement,
        spellChecker: false,
        toolbar: [
          {
            name: 'toggle-preview',
            action: EasyMDE.togglePreview,
            text: 'Preview',
            title: 'Preview Button',
          },
          ...this.toolbar,
        ],
        renderingConfig: {
          sanitizerFunction: (renderedHTML: string) => {
            return this.domSanitizer.sanitize(
              SecurityContext.HTML,
              renderedHTML
            )!;
          },
        },
      });
      this.mdEditor.value(this.initialValue);
    }
  }

  copyMarkdownData() {
    this.clipboard.copy(this.mdEditor.value());
  }

  downloadMarkdown() {
    const blob = new Blob([this.mdEditor.value()], { type: 'plain/text' });
    this.fileService.downloadFile('README.md', blob, this.renderer);
  }
}
