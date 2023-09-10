import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationUtilService {
  /**
   * generate random unique id
   * @returns
   */
  generateRandomId(): string {
    return String(Math.floor(Math.random() * Date.now()));
  }
}
