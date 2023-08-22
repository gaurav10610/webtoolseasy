import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssFormatterRoutingModule } from './css-formatter-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CssFormatterComponent } from './css-formatter.component';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { RelatedToolsModule } from 'src/app/modules/related-tools/related-tools.module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { ShareButtonsModule } from 'src/app/modules/share-buttons/share-buttons.module';
import { FollowButtonsModule } from 'src/app/modules/follow-buttons/follow-buttons.module';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [CssFormatterComponent],
  imports: [
    CommonModule,
    CssFormatterRoutingModule,
    ShareButtonsModule,
    FollowButtonsModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    RelatedToolsModule,
    DescriptionModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class CssFormatterModule {}
