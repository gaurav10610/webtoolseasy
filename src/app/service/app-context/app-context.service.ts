import { Injectable } from '@angular/core';

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
}
