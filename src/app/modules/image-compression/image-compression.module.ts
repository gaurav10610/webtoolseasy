import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCompressionRoutingModule } from './image-compression-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCompressionComponent } from 'src/app/components/image-compression/image-compression.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSliderModule } from '@angular/material/slider';
import { CompressSettingsComponent } from 'src/app/components/compress-settings/compress-settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';

@NgModule({
  declarations: [ImageCompressionComponent, CompressSettingsComponent],
  imports: [
    CommonModule,
    ImageCompressionRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    LayoutModule,
    MatSliderModule,
    MatDialogModule,
    HeaderToolbarModule,
    ToolHeadingModule,
  ],
})
export class ImageCompressionModule {}
