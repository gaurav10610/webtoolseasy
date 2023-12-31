import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { FileService } from 'src/app/service/file/file.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/guid-generator/config';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-guid-generator',
  templateUrl: './guid-generator.component.html',
  styleUrls: ['./guid-generator.component.scss'],
})
export class GuidGeneratorComponent {
  currentUUID: string;
  bulkUUIDs: string[] = [];

  @ViewChild('bulkUUIDInput', { static: false })
  bulkUUIDInput!: ElementRef;

  bulkUUIDError: boolean = false;

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    private fileService: FileService,
    private renderer: Renderer2
  ) {
    this.currentUUID = Guid.create().toString();
  }

  generateUUID() {
    this.currentUUID = Guid.create().toString();
  }

  copyGeneratedId() {
    this.clipboard.copy(this.currentUUID);
  }

  generateBulkUUID() {
    const count = this.bulkUUIDInput.nativeElement.value;
    if (count <= 1000) {
      this.bulkUUIDError = false;
      this.bulkUUIDs = [];
      for (let i = 0; i < count; i++) {
        this.bulkUUIDs.push(Guid.create().toString());
      }
    } else {
      this.bulkUUIDError = true;
    }
  }

  /**
   * generate bulk UUIDs with specified version and download to text file
   * @param event
   * @param version
   */
  async downloadUUIDs(event: Event) {
    /**
     * cancel default action
     */
    event.preventDefault();
    let string = '';
    const count = this.bulkUUIDInput.nativeElement.value;
    if (count <= 1000) {
      this.bulkUUIDError = false;
      for (let i = 0; i < count; i++) {
        string = string.concat(...[Guid.create().toString(), '\r\n']);
      }
      this.fileService.downloadFile(
        `bulk-guid-${count}.txt`,
        new Blob([string], { type: 'plain/text' }),
        this.renderer
      );
    } else {
      this.bulkUUIDError = true;
    }
  }
}
