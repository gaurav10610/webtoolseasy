import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCompressionRoutingModule } from './image-compression-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageCompressionComponent } from 'src/app/components/image-compression/image-compression.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ImageCompressionComponent],
  imports: [
    CommonModule,
    ImageCompressionRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
  ],
})
export class ImageCompressionModule {}
