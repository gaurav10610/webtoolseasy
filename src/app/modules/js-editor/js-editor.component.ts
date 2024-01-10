import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { html_beautify } from 'js-beautify';
import { AppContext, ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { AppCacheService } from 'src/app/service/app-cache/app-cache.service';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/js-editor/config';
import { environment } from 'src/environments/environment';
import { ApplicationIds } from 'src/environments/tools-directory-config';

@Component({
  selector: 'app-js-editor',
  templateUrl: './js-editor.component.html',
  styleUrls: ['./js-editor.component.scss'],
})
export class JsEditorComponent implements OnInit {
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
          WebToolsEasy is awesome. Explore more such free tools.
      </p>
  
      <p id="js-demo"></p>
  
      <script>
          let a = 5;
          let b = 6;
          let c = a + b + 10;
          document
              .getElementById("js-demo")
              .innerHTML = "The value of c is: " + c;
      </script>
  
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
      ApplicationIds.JS_EDITOR
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
      id: ApplicationIds.JS_EDITOR,
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
