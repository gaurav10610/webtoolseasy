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

  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    titleService: Title,
    metaService: Meta
  ) {
    this.router = router;
    this.configService = configService;
    this.contextService = contextService;
    this.titleService = titleService;
    this.metaService = metaService;
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
  }

  onAppClick(event: any) {
    event.stopPropagation();
  }
}
