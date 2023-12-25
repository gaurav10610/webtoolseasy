import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/js-editor/config';

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
      let c = a + b;
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
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.iframeSourceCode = this.domSanitizer.bypassSecurityTrustHtml(
      this.rawCode
    );
  }

  onRawCodeChange(updatedModel: string) {
    this.iframeSourceCode =
      this.domSanitizer.bypassSecurityTrustHtml(updatedModel);
  }
}
