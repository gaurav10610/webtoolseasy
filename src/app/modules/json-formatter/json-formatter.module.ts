import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormatterRoutingModule } from './json-formatter-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JsonFormatterComponent } from 'src/app/components/json-formatter/json-formatter.component';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { RelatedToolsModule } from 'src/app/modules/related-tools/related-tools.module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer-scrolling';

@NgModule({
  declarations: [JsonFormatterComponent],
  imports: [
    CommonModule,
    JsonFormatterRoutingModule,
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
