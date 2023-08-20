import { isPlatformBrowser } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApplicationConfig, IconConfig } from '../@types/config';

export abstract class BaseComponent {
  iconsPath = `${environment.hostname}/assets/images/icons/`;
  tags: string[] = [];

  constructor() {}

  updateTags(componentConfig: ApplicationConfig) {
    this.tags = componentConfig.tags;
  }

  async loadCustomIcons(
    icons: IconConfig[],
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      /**
       * set assets path when executed in browser
       */
      this.iconsPath = `${environment.hostname}/assets/images/icons/`;
    } else {
      /**
       * set assets path when executed on server
       */
      this.iconsPath = `http://localhost:${environment.port}/assets/images/icons/`;
    }

    icons.forEach(iconConfig =>
      matIconRegistry.addSvgIcon(
        iconConfig.iconName,
        domSanitizer.bypassSecurityTrustResourceUrl(
          this.iconsPath + iconConfig.iconRelativeUrl
        )
      )
    );
  }

  /**
   * set following page metadata
   *
   * 1. title
   * 2. meta
   * 3. canonical url
   */
  async updatePageMetaData(
    applicationConfig: ApplicationConfig,
    titleService: Title,
    metaService: Meta,
    document: Document
  ) {
    titleService.setTitle(applicationConfig.pageTitle);
    applicationConfig.metaTags.forEach(metaDefinition => {
      // if (metaDefinition.name) {
      //   metaService.removeTag(`name=${metaDefinition.name}`);
      // }

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
