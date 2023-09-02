import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRecorderRoutingModule } from './screen-recorder-routing.module';
import { ScreenRecorderComponent } from './screen-recorder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ScreenRecorderComponent],
  imports: [
    CommonModule,
    ScreenRecorderRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
})
export class ScreenRecorderModule {}
