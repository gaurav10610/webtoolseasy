import {
  Component,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/text-compare/config';
import { FileService } from 'src/app/service/file/file.service';
import { DiffEditorComponent, DiffEditorModel } from 'ngx-monaco-editor-v2';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Component({
  selector: 'app-text-compare',
  templateUrl: './text-compare.component.html',
  styleUrls: ['./text-compare.component.scss'],
})
export class TextCompareComponent {
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

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private renderer: Renderer2,
    private fileService: FileService,
    private zoneRef: NgZone,
    public platformMetadataService: PlatformMetadataService
  ) {}

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
