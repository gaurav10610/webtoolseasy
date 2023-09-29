import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  SecurityContext,
  Renderer2,
  OnDestroy,
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
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/service/file/file.service';
import { LogUtils } from 'src/app/service/util/logger';

declare var EasyMDE: any;

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent implements AfterViewInit, OnDestroy {
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

  private style?: HTMLLinkElement;

  constructor(
    public platformMetaDataService: PlatformMetadataService,
    @Inject(DOCUMENT) private document: any,
    private clipboard: Clipboard,
    private domSanitizer: DomSanitizer,
    private fileService: FileService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (this.platformMetaDataService.isPlatformBrowser) {
      this.importStyle(
        'https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css'
      ).then(() => {
        importScript(
          'https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js'
        ).then(() => {
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
                );
              },
            },
          });
          this.mdEditor.value(this.initialValue);
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.platformMetaDataService.isPlatformBrowser) {
      this.renderer.removeChild(this.document.head, this.style);
    }
  }

  copyMarkdownData() {
    LogUtils.info(this.mdEditor.markdown());
    this.clipboard.copy(this.mdEditor.value());
  }

  downloadMarkdown() {
    const blob = new Blob([this.mdEditor.value()], { type: 'plain/text' });
    this.fileService.downloadFile('README.md', blob, this.renderer);
  }

  async importStyle(url: string) {
    // Create a link element via Angular's renderer to avoid SSR troubles
    this.style = this.renderer.createElement('link') as HTMLLinkElement;

    // Add the style to the head section
    this.renderer.appendChild(this.document.head, this.style);

    // Set type of the link item and path to the css file
    this.renderer.setProperty(this.style, 'rel', 'stylesheet');
    this.renderer.setProperty(this.style, 'href', url);
  }
}
