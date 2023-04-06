import { Injectable } from '@angular/core';
import { AppDisplayConfig } from 'src/app/@types/config';

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
}
