import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppContext, ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/js-compiler/config';
import { Clipboard } from '@angular/cdk/clipboard';
import { ActivatedRoute, Router } from '@angular/router';
import { js_beautify } from 'js-beautify';
import { environment } from 'src/environments/environment';
import { AppCacheService } from 'src/app/service/app-cache/app-cache.service';
import { ApplicationIds } from 'src/environments/tools-directory-config';

@Component({
  selector: 'app-js-compiler',
  templateUrl: './js-compiler.component.html',
  styleUrls: ['./js-compiler.component.scss'],
})
export class JsCompilerComponent implements OnInit {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  htmlTemplate: string = `
  <!DOCTYPE html>
  <html>

  <head>
      <title>Page Title</title>
  </head>

  <body>
      <script>
          window.console.log = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.debug = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.error = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.info = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.trace = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.warn = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          try {
              {code}
          } catch (error) {
              console.log(error);
              console.log(error.stack);
          }
      </script>
  </body>

  </html>
  `;

  rawCode: string = `
  /**
   * This is an Online Javascript Compiler offered by WebToolsEasy
   */
  
  const obj = {
      appName: 'WebToolsEasy'
  }
  
  console.log("Welcome to WebToolsEasy!", obj);
  `;

  /**
   * monaco editor options
   */
  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: 15,
  };

  iframeSourceCode: any;

  constructor(
    public platformMetaDataService: PlatformMetadataService,
    private domSanitizer: DomSanitizer,
    private clipboard: Clipboard,
    private route: ActivatedRoute,
    private router: Router,
    private appCacheService: AppCacheService
  ) {
    const appContext: AppContext | null = this.appCacheService.getAppContext(
      ApplicationIds.JS_COMPILER
    );

    if (appContext && appContext.data) {
      this.rawCode = appContext.data;
    }

    if (route.snapshot.queryParams['code']) {
      this.rawCode = decodeURIComponent(route.snapshot.queryParams['code']);
    }
  }

  ngOnInit(): void {
    this.iframeSourceCode = this.domSanitizer.bypassSecurityTrustHtml(
      this.getUpdatedHtmlTemplate(this.rawCode)
    );
  }

  onRawCodeChange(updatedModel: string) {
    this.rawCode = updatedModel;

    /**
     * store updated code in browser cache
     */
    this.appCacheService.setAppContext({
      id: ApplicationIds.JS_COMPILER,
      data: updatedModel,
    });
  }

  getUpdatedHtmlTemplate(rawJSCode: string) {
    return this.htmlTemplate.replace('{code}', rawJSCode);
  }

  runCode() {
    this.iframeSourceCode = this.domSanitizer.bypassSecurityTrustHtml(
      this.getUpdatedHtmlTemplate(this.rawCode)
    );
  }

  formatCode() {
    this.rawCode = js_beautify(this.rawCode);
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
