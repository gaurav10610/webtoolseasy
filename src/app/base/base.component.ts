import { isPlatformBrowser } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApplicationConfig, IconConfig } from 'src/app/@types/config';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

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
    platformId: string,
    appContextService: AppContextService
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

    const epochMS: number = Date.now();

    /**
     * load only those icons which are not already registered
     */
    icons
      .filter(
        iconConfig => !appContextService.svgIcons.has(iconConfig.iconName)
      )
      .forEach(iconConfig => {
        matIconRegistry.addSvgIcon(
          iconConfig.iconName,
          domSanitizer.bypassSecurityTrustResourceUrl(`
            ${this.iconsPath}${iconConfig.iconRelativeUrl}?${epochMS}`)
        );
        appContextService.svgIcons.set(iconConfig.iconName, true);
      });
  }

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
