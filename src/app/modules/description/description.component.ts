import { Component } from '@angular/core';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  constructor(public appContextService: AppContextService) {}
}
