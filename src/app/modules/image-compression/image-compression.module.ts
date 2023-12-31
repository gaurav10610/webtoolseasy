import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCompressionRoutingModule } from './image-compression-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCompressionComponent } from './image-compression.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [ImageCompressionComponent],
  imports: [
    CommonModule,
    ImageCompressionRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSliderModule,
  ],
})
export class ImageCompressionModule {}
