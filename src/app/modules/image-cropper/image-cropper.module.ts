import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCropperRoutingModule } from './image-cropper-routing.module';
import { ImageCropperComponent } from './image-cropper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ImageCropperComponent],
  imports: [
    CommonModule,
    ImageCropperRoutingModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ImageCropperModule {}
