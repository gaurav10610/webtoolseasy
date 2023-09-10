import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCropperRoutingModule } from './image-cropper-routing.module';
import { ImageCropperComponent } from './image-cropper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule as CropperModule } from 'ngx-image-cropper';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ImageCropperComponent],
  imports: [
    CommonModule,
    ImageCropperRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CropperModule,
  ],
})
export class ImageCropperModule {}
