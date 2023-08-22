import { APP_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxGoogleAnalyticsModule.forRoot(environment.gaCode),
    NgxGoogleAnalyticsRouterModule,
  ],
  providers: [{ provide: APP_ID, useValue: 'webtoolseasyapp' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
