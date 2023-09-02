import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoConverterRoutingModule } from './video-converter-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VideoConverterComponent } from './video-converter.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PopupFormModule } from '../popup-form/popup-form.module';

@NgModule({
  declarations: [VideoConverterComponent],
  imports: [
    CommonModule,
    VideoConverterRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTooltipModule,
    LayoutModule,
    MatSliderModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    PopupFormModule,
  ],
})
export class VideoConverterModule {}
