import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/text-compare/config';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { FileService } from 'src/app/service/file/file.service';
import { DiffEditorComponent, DiffEditorModel } from 'ngx-monaco-editor-v2';
import { LogUtils } from 'src/app/service/util/logger';

@Component({
  selector: 'app-text-compare',
  templateUrl: './text-compare.component.html',
  styleUrls: ['./text-compare.component.scss'],
})
export class TextCompareComponent extends BaseComponent {
  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  @ViewChild('diffEdior', { static: false })
  diffEdior!: DiffEditorComponent;

  currentFileDialogId!: string;

  editorOptions = {
    originalEditable: true,
    fontSize: 17,
  };

  originalModel: DiffEditorModel = {
    code: `This was original data!\nwebtoolseasy is awesome`,
    language: 'text/plain',
  };

  modifiedModel: DiffEditorModel = {
    code: `This was modified data!\nwebtoolseasy is super cool`,
    language: 'text/plain',
  };

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private renderer: Renderer2,
    private appContextService: AppContextService,
    private fileService: FileService,
    private zoneRef: NgZone
  ) {
    super();
    this.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer,
      this.platformId,
      this.appContextService
    );
    this.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
    this.appContextService.tags = componentConfig.tags;
    this.appContextService.mainHeading = componentConfig.mainHeading!;
    this.appContextService.subHeading = componentConfig.subHeading;
    this.appContextService.descrptionData = descriptionData;
  }

  async selectFiles(event: any) {
    const file: File = event.target.files[0];
    if (this.currentFileDialogId === 'original') {
      this.fileService.readFileAsText(file, this.onTextFile1Upload.bind(this));
    }
    if (this.currentFileDialogId === 'modified') {
      this.fileService.readFileAsText(file, this.onTextFile2Upload.bind(this));
    }
    event.target.value = null;
  }

  async onTextFile1Upload(textContent: string) {
    this.zoneRef.run(() => {
      const dataModel: DiffEditorModel = {
        code: textContent,
        language: 'text/plain',
      };
      this.diffEdior.originalModel = dataModel;
    });
  }

  async onTextFile2Upload(textContent: string) {
    this.zoneRef.run(() => {
      const dataModel: DiffEditorModel = {
        code: textContent,
        language: 'text/plain',
      };
      this.diffEdior.modifiedModel = dataModel;
    });
  }

  /**
   * select file
   * @param fileId
   */
  async openFileDialog(fileId: string) {
    this.currentFileDialogId = fileId;
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
  }
}
