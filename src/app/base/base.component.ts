import { Router } from '@angular/router';
import { ConfigService } from '../service/common/config.service';

export abstract class BaseComponent {
  constructor(private router: Router, private configService: ConfigService) {}

  navigateByAppId(applicationId: string) {
    this.router.navigateByUrl(
      this.configService.getApplicationRoute(applicationId)
    );
  }
}
