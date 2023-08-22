import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormatterRoutingModule } from './json-formatter-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JsonFormatterComponent } from './json-formatter.component';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { RelatedToolsModule } from 'src/app/modules/related-tools/related-tools.module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ShareButtonsModule } from 'src/app/modules/share-buttons/share-buttons.module';
import { FollowButtonsModule } from 'src/app/modules/follow-buttons/follow-buttons.module';

@NgModule({
  declarations: [JsonFormatterComponent],
  imports: [
    CommonModule,
    JsonFormatterRoutingModule,
    ShareButtonsModule,
    FollowButtonsModule,
    NgxJsonViewerModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    RelatedToolsModule,
    DescriptionModule,
  ],
})
export class JsonFormatterModule {}
