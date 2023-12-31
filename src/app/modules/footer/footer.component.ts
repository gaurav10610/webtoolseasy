import { Component } from '@angular/core';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(public platformMetaDataService: PlatformMetadataService) {}

  openLink(url: string) {
    window.open(url, '_blank')?.focus();
  }
}
