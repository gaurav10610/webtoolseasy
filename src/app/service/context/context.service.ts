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

  setCurrentAppId(applicationId: string) {
    this.applicationId = applicationId;
  }
}
