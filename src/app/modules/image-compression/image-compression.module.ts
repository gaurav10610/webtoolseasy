import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCompressionRoutingModule } from './image-compression-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCompressionComponent } from './image-compression.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSliderModule } from '@angular/material/slider';
import { CompressSettingsComponent } from 'src/app/modules/image-compression/compress-settings/compress-settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { ShareButtonsModule } from 'src/app/modules/share-buttons/share-buttons.module';
import { FollowButtonsModule } from 'src/app/modules/follow-buttons/follow-buttons.module';

@NgModule({
  declarations: [ImageCompressionComponent, CompressSettingsComponent],
  imports: [
    CommonModule,
    ImageCompressionRoutingModule,
    ShareButtonsModule,
    FollowButtonsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    LayoutModule,
    MatSliderModule,
    MatDialogModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    DescriptionModule,
  ],
})
export class ImageCompressionModule {}
