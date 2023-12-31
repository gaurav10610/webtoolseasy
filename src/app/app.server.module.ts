import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
// import { environment } from 'src/environments/environment';
// import {
//   NgxGoogleAnalyticsModule,
//   NgxGoogleAnalyticsRouterModule,
// } from 'ngx-google-analytics';

// const analyticsModules = [];

// if (environment.production) {
//   analyticsModules.push(NgxGoogleAnalyticsModule.forRoot(environment.gaCode));
//   analyticsModules.push(NgxGoogleAnalyticsRouterModule);
// }

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
