import { Component } from '@angular/core';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss'],
})
export class ShareButtonsComponent {
  constructor(
    public appContextService: AppContextService,
    public platformMetaDataService: PlatformMetadataService
  ) {}
}
