import { Component } from '@angular/core';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-follow-buttons',
  templateUrl: './follow-buttons.component.html',
  styleUrls: ['./follow-buttons.component.scss'],
})
export class FollowButtonsComponent {
  constructor(public platformMetaDataService: PlatformMetadataService) {}
}
