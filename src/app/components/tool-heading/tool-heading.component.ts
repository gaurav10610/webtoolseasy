import { Component } from '@angular/core';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-tool-heading',
  templateUrl: './tool-heading.component.html',
  styleUrls: ['./tool-heading.component.scss'],
})
export class ToolHeadingComponent {
  constructor(public appContextService: AppContextService) {}
}
