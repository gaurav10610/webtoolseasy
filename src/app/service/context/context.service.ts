import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  constructor() {}

  private applicationId: string = 'home';

  getCurrentAppId(): string {
    return this.applicationId;
  }

  setAppId(applicationId: string) {
    this.applicationId = applicationId;
  }
}
