import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';

const analyticsModules = environment.production
  ? [
      NgxGoogleAnalyticsModule.forRoot(environment.gaCode),
      NgxGoogleAnalyticsRouterModule,
    ]
  : [];

@NgModule({
  imports: [AppModule, ServerModule, ...analyticsModules],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
