import { Injectable } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  applicationConfig: Map<string, ApplicationConfig> = new Map();
  constructor() {
    this.applicationConfig.set('home', {
      navigationUrl: 'tools',
      tags: [],
    });
    this.applicationConfig.set('uuid', {
      navigationUrl: 'tools/uuid',
      tags: [
        'uuid',
        'unique identifier',
        'id generator',
        'uuid generator',
        'programming',
        'development',
      ],
    });
    this.applicationConfig.set('jwt', {
      navigationUrl: 'tools/jwt',
      tags: ['jwt', 'jwt token', 'jwt decode'],
    });
  }

  getApplicationRoute(applicationId: string): string | undefined {
    return this.applicationConfig.get(applicationId)?.navigationUrl;
  }

  getApplicationTags(applicationId: string): string[] | undefined {
    return this.applicationConfig.get(applicationId)?.tags;
  }
}
