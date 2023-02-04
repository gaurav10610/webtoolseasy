import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRecorderRoutingModule } from './screen-recorder-routing.module';
import { ScreenRecorderComponent } from 'src/app/components/screen-recorder/screen-recorder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';

@NgModule({
  declarations: [ScreenRecorderComponent],
  imports: [
    CommonModule,
    ScreenRecorderRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    HeaderToolbarModule,
    ToolHeadingModule,
  ],
})
export class ScreenRecorderModule {}
