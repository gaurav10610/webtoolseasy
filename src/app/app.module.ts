import { APP_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserAnimationsModule, HttpClientModule],
  providers: [{ provide: APP_ID, useValue: 'webtoolseasyapp' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
