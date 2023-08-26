import { Component } from '@angular/core';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-related-tools',
  templateUrl: './related-tools.component.html',
  styleUrls: ['./related-tools.component.scss'],
})
export class RelatedToolsComponent {
  constructor(public appContextService: AppContextService) {}
}
