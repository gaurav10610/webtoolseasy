import { Injectable } from '@angular/core';
import { ApplicationConfig } from 'src/app/@types/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  applicationConfig: Map<string, ApplicationConfig> = new Map();
  constructor() {
    this.applicationConfig.set('home', {
      navigationUrl: '/tools',
      pageTitle: 'Tools Home | Web Tools Easy',
      metaTags: [
        {
          name: 'description',
          content: 'Home page of WebToolsEasy',
        },
        {
          name: 'keywords',
          content: 'JWT, UUID, WebToolsEasy',
        },
        {
          name: 'author',
          content: 'Gaurav Kumar Yadav',
        },
        { name: 'robots', content: 'index, follow' },
      ],
      tags: [],
    });
    this.applicationConfig.set('uuid', {
      navigationUrl: '/tools/uuid',
      pageTitle: 'UUID Generator | Web Tools Easy',
      metaTags: [
        {
          name: 'description',
          content: 'Online UUID Generator',
        },
        {
          name: 'keywords',
          content: 'UUID Generator, Generate UUID Online, UUID',
        },
        {
          name: 'author',
          content: 'Gaurav Kumar Yadav',
        },
        { name: 'robots', content: 'index, follow' },
      ],
      tags: [
        'uuid',
        'unique identifier',
        'id generator',
        'uuid generator',
        'programming',
      ],
    });
    this.applicationConfig.set('jwt', {
      navigationUrl: '/tools/jwt',
      pageTitle: 'JWT Decoder | Web Tools Easy',
      metaTags: [
        {
          name: 'description',
          content: 'Online JWT Decoder',
        },
        {
          name: 'keywords',
          content: 'JWT Decoder, Decode JWT Online, JSON Web Token',
        },
        {
          name: 'author',
          content: 'Gaurav Kumar Yadav',
        },
        { name: 'robots', content: 'index, follow' },
      ],
      tags: [
        'jwt',
        'json web token',
        'jwt token',
        'jwt decoder',
        'programming',
      ],
    });
    this.applicationConfig.set('jsonformatter', {
      navigationUrl: '/tools/json-formatter',
      pageTitle: 'JSON Formater | Web Tools Easy',
      metaTags: [
        {
          name: 'description',
          content: 'Online JSON Formatter',
        },
        {
          name: 'keywords',
          content: 'JSON Formatter, Format JSON Online, JSON',
        },
        {
          name: 'author',
          content: 'Gaurav Kumar Yadav',
        },
        { name: 'robots', content: 'index, follow' },
      ],
      tags: ['json', 'json formatter', 'json beautify', 'programming'],
    });
    this.applicationConfig.set('imagecompress', {
      navigationUrl: '/tools/image-compress',
      pageTitle: 'Image Compression | Web Tools Easy',
      metaTags: [
        {
          name: 'description',
          content: 'Online Image Compression',
        },
        {
          name: 'keywords',
          content:
            'Image Compressor, Image Compression Online, Compression, Image',
        },
        {
          name: 'author',
          content: 'Gaurav Kumar Yadav',
        },
        { name: 'robots', content: 'index, follow' },
      ],
      tags: ['image', 'image compression', 'image compressor', 'compression'],
    });
    this.applicationConfig.set('soon', {
      navigationUrl: '',
      pageTitle: '',
      metaTags: [],
      tags: [],
    });
  }

  getApplicationConfig(applicationId: string): ApplicationConfig | undefined {
    return this.applicationConfig.get(applicationId);
  }
}
