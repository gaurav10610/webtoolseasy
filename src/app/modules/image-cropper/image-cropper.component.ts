import {
  Component,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { BaseFileData, FileDataType } from 'src/app/@types/file';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/image-cropper/config';
import { v4 } from 'uuid';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent {
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  validImageFormats: string = '.jpg,.jpeg,.png,.webp,.bmp';

  fileList: BaseFileData[] = [];

  @ViewChild('inputFiles', { static: false })
  inputFiles!: ElementRef;

  constructor(
    private zoneRef: NgZone,
    private renderer: Renderer2
  ) {}

  selectFiles(event: any) {
    for (const file of event.target.files) {
      this.addFileToCrop(file);
    }
  }

  openFileDialog() {
    this.renderer
      .selectRootElement(this.inputFiles.nativeElement, true)
      .click();
  }

  /**
   * file drop event handler
   * @param event
   */
  dropHandler(event: any) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items]
        .filter(item => item.kind === 'file')
        .map(item => item.getAsFile())
        .forEach(file => this.addFileToCrop(file));
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach(file => this.addFileToCrop(file));
    }
  }

  /**
   * handle drag over event
   * @param event
   */
  dragOverHandler(event: any) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }

  addFileToCrop(file: File) {
    this.fileList.push({
      id: v4(),
      file: file,
      inProgress: false,
      type: FileDataType.IMAGE,
      name: file.name,
    });
  }
}
