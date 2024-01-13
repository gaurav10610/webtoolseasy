import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppContext, ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { AppCacheService } from 'src/app/service/app-cache/app-cache.service';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/html-editor/config';
import { ApplicationIds } from 'src/environments/tools-directory-config';
import { Clipboard } from '@angular/cdk/clipboard';
import { ActivatedRoute, Router } from '@angular/router';
import { html_beautify } from 'js-beautify';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent implements OnInit {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  rawCode: string = `
  <!DOCTYPE html>
  <html>
  
  <head>
      <title>Page Title</title>
  </head>
  
  <body>
  
      <h1>This is an Online HTML Editor</h1>
      <p style="color:red">
          WebToolsEasy is Shikha. Explore more such free tools.
      </p>
  
  </body>
  
  </html>
  `;

  /**
   * monaco editor options
   */
  editorOptions = {
    theme: 'vs-dark',
    language: 'html',
    fontSize: 15,
  };

  iframeSourceCode: any;

  constructor(
    public platformMetaDataService: PlatformMetadataService,
    private domSanitizer: DomSanitizer,
    private appCacheService: AppCacheService,
    private clipboard: Clipboard,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const appContext: AppContext | null = this.appCacheService.getAppContext(
      ApplicationIds.HTML_EDITOR
    );

    if (appContext && appContext.data) {
      this.rawCode = appContext.data;
    }

    if (this.route.snapshot.queryParams['code']) {
      this.rawCode = decodeURIComponent(
        this.route.snapshot.queryParams['code']
      );
    }
  }

  ngOnInit(): void {
    this.iframeSourceCode = this.domSanitizer.bypassSecurityTrustHtml(
      this.rawCode
    );
  }

  onRawCodeChange(updatedModel: string) {
    this.rawCode = updatedModel;

    /**
     * store updated code in browser cache
     */
    this.appCacheService.setAppContext({
      id: ApplicationIds.HTML_EDITOR,
      data: updatedModel,
    });
  }

  runCode() {
    this.iframeSourceCode = this.domSanitizer.bypassSecurityTrustHtml(
      this.rawCode
    );
  }

  formatCode() {
    this.rawCode = html_beautify(this.rawCode);
  }

  copyShareableLink() {
    this.clipboard.copy(
      `${environment.hostname}${this.router.url}?code=${encodeURIComponent(
        this.rawCode
      )}`
    );
  }

  copyCode() {
    this.clipboard.copy(this.rawCode);
  }
}
