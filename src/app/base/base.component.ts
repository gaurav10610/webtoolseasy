import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApplicationConfig } from '../@types/config';
import { ConfigService } from '../service/common/config.service';
import { ContextService } from '../service/context/context.service';

export abstract class BaseComponent {
  router: Router;
  configService: ConfigService;
  contextService: ContextService;
  tags: string[] = [];
  metaService: Meta;
  titleService: Title;
  document: Document;

  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    titleService: Title,
    metaService: Meta,
    document: Document
  ) {
    this.router = router;
    this.configService = configService;
    this.contextService = contextService;
    this.titleService = titleService;
    this.metaService = metaService;
    this.document = document;
  }

  navigateByAppId(applicationId: string) {
    if (
      <string>(
        this.configService.getApplicationConfig(applicationId)?.navigationUrl
      ) !== ''
    ) {
      this.router.navigateByUrl(
        <string>(
          this.configService.getApplicationConfig(applicationId)?.navigationUrl
        )
      );
    }
  }

  /**
   * set following page metadata
   *
   * 1. title
   * 2. meta
   * 3. canonical url
   *
   */
  updatePageMetaData() {
    const applicationConfig: ApplicationConfig =
      this.configService.getApplicationConfig(
        this.contextService.getCurrentAppId()
      )!;
    this.titleService.setTitle(applicationConfig.pageTitle);
    applicationConfig.metaTags.forEach(metaDefinition => {
      this.metaService.removeTag(`name=${metaDefinition.name}`);
      this.metaService.addTag(metaDefinition);
    });

    /**
     * set canonical url
     */
    let linkElement: HTMLLinkElement | null =
      this.document.querySelector(`link[rel='canonical']`) || null;
    if (linkElement == null) {
      linkElement = this.document.createElement('link') as HTMLLinkElement;
      this.document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('rel', 'canonical');
    linkElement.setAttribute(
      'href',
      `https://webtoolseasy.com${applicationConfig.navigationUrl}`
    );
  }

  onAppClick(event: any) {
    event.stopPropagation();
  }
}
