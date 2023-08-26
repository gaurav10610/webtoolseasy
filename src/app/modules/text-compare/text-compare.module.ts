import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextCompareRoutingModule } from './text-compare-routing.module';
import { TextCompareComponent } from './text-compare.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { ShareButtonsModule } from 'src/app/modules/share-buttons/share-buttons.module';
import { FollowButtonsModule } from 'src/app/modules/follow-buttons/follow-buttons.module';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [TextCompareComponent],
  imports: [
    CommonModule,
    TextCompareRoutingModule,
    ShareButtonsModule,
    FollowButtonsModule,
    MatIconModule,
    MatButtonModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    DescriptionModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class TextCompareModule {}
