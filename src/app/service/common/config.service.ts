import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  appRouteConfig: Map<string, string> = new Map();
  constructor() {
    this.appRouteConfig.set('home', 'apps');
    this.appRouteConfig.set('uuid', 'apps/uuid');
  }

  getApplicationRoute(applicationId: string): string {
    return <string>this.appRouteConfig.get(applicationId);
  }
}
