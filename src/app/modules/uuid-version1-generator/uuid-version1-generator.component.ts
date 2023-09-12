import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DescriptionBlock } from 'src/app/@types/description';
import { FileService } from 'src/app/service/file/file.service';
import { v1 } from 'uuid';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/uuid-version1-generator/config';
import { Clipboard } from '@angular/cdk/clipboard';
import { ApplicationConfig } from 'src/app/@types/config';

@Component({
  selector: 'app-uuid-version1-generator',
  templateUrl: './uuid-version1-generator.component.html',
  styleUrls: ['./uuid-version1-generator.component.scss'],
})
export class UuidVersion1GeneratorComponent {
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
    this.currentUUID = v1();
  }

  generateUUID() {
    this.currentUUID = v1();
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
        this.bulkUUIDs.push(v1());
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
        string = string.concat(...[v1(), '\r\n']);
      }
      this.fileService.downloadFile(
        `bulk-uuid-v1-${count}.txt`,
        new Blob([string], { type: 'plain/text' }),
        this.renderer
      );
    } else {
      this.bulkUUIDError = true;
    }
  }
}
