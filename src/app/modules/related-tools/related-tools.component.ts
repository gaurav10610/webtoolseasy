import { Component } from '@angular/core';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-related-tools',
  templateUrl: './related-tools.component.html',
  styleUrls: ['./related-tools.component.scss'],
})
export class RelatedToolsComponent {
  constructor(
    public appContextService: AppContextService,
    public platformMetaDataService: PlatformMetadataService
  ) {}
}
