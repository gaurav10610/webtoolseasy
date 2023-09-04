import { Injectable } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Injectable({
  providedIn: 'root',
})
export class AppContextService {
  applicationConfig?: ApplicationConfig;
  descriptionData?: DescriptionBlock[];
  appUrl?: string;
}
