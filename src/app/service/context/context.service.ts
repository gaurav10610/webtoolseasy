import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  constructor(private deviceService: DeviceDetectorService) {}

  private applicationId: string = 'home';

  getCurrentAppId(): string {
    return this.applicationId;
  }

  setCurrentAppId(applicationId: string) {
    this.applicationId = applicationId;
  }
}
