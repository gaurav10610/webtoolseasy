import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ApplicationConfig } from 'src/app/@types/config';

@Injectable({
  providedIn: 'root',
})
export class MetaConfigService {
  constructor() {}

  /**
   * set following page metadata
   *
   * 1. title
   * 2. meta
   * 3. canonical url
   * 4. og:graph meta tags
   */
  async updatePageMetaData(
    applicationConfig: ApplicationConfig,
    titleService: Title,
    metaService: Meta,
    document: Document
  ) {
    titleService.setTitle(applicationConfig.pageTitle);
    applicationConfig.metaTags.forEach(metaDefinition => {
      metaService.updateTag(metaDefinition);
    });

    /**
     * set canonical url
     */
    let linkElement: HTMLLinkElement | null =
      document.querySelector(`link[rel='canonical']`) || null;
    if (linkElement == null) {
      linkElement = document.createElement('link') as HTMLLinkElement;
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('rel', 'canonical');
    linkElement.setAttribute(
      'href',
      `https://webtoolseasy.com${applicationConfig.navigationUrl}`
    );
  }
}
