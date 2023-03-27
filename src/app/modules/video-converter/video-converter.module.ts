import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoConverterRoutingModule } from './video-converter-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { VideoConverterComponent } from 'src/app/components/video-converter/video-converter.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PopupFormModule } from 'src/app/modules/popup-form/popup-form.module';

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
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    PopupFormModule,
  ],
})
export class VideoConverterModule {}
