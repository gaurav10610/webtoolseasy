import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonViewerRoutingModule } from './json-viewer-routing.module';
import { JsonViewerComponent } from './json-viewer.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [JsonViewerComponent],
  imports: [
    CommonModule,
    JsonViewerRoutingModule,
    NgxJsonViewerModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class JsonViewerModule {}
