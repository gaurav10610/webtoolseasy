import { Component } from '@angular/core';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  descriptionData: any;
  constructor(private appContextService: AppContextService) {
    this.descriptionData = appContextService.descrptionData;
  }
}
