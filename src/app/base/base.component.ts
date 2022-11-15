import { Router } from '@angular/router';
import { ConfigService } from '../service/common/config.service';
import { ContextService } from '../service/context/context.service';

export abstract class BaseComponent {
  router: Router;
  configService: ConfigService;
  contextService: ContextService;
  tags: string[] = [];

  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService
  ) {
    this.router = router;
    this.configService = configService;
    this.contextService = contextService;
  }

  navigateByAppId(applicationId: string) {
    this.contextService.setAppId(applicationId);
    this.router.navigateByUrl(
      <string>this.configService.getApplicationRoute(applicationId)
    );
  }
}
