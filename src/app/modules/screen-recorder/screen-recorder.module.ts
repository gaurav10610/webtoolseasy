import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRecorderRoutingModule } from './screen-recorder-routing.module';
import { ScreenRecorderComponent } from 'src/app/components/screen-recorder/screen-recorder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ScreenRecorderComponent],
  imports: [
    CommonModule,
    ScreenRecorderRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class ScreenRecorderModule {}
