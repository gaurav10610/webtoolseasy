import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { FileService } from 'src/app/service/file/file.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/uuid-version4-generator/config';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-uuid-version4-generator',
  templateUrl: './uuid-version4-generator.component.html',
  styleUrls: ['./uuid-version4-generator.component.scss'],
})
export class UuidVersion4GeneratorComponent {
  currentUUID: string = '';
  bulkUUIDs: string[] = [];

  @ViewChild('bulkUUIDInput', { static: false })
  bulkUUIDInput!: ElementRef;

  bulkUUIDError: boolean = false;

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    private fileService: FileService,
    private renderer: Renderer2,
    private platformMetaDataService: PlatformMetadataService
  ) {
    if (platformMetaDataService.isPlatformBrowser) {
      this.currentUUID = crypto.randomUUID();
    }
  }

  generateUUID() {
    this.currentUUID = crypto.randomUUID();
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
        this.bulkUUIDs.push(crypto.randomUUID());
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
        string = string.concat(...[crypto.randomUUID(), '\r\n']);
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
