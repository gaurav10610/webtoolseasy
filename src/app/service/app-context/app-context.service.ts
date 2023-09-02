import { Injectable } from '@angular/core';
import { AppDisplayConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Injectable({
  providedIn: 'root',
})
export class AppContextService {
  /**
   * web tool headings
   */
  mainHeading: string = '';
  subHeading: string | undefined;
  tags: string[] = [];
  relatedTools?: AppDisplayConfig[];
  descrptionData?: DescriptionBlock[];
}
