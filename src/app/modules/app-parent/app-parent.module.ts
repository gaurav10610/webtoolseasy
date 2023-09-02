import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppParentRoutingModule } from './app-parent-routing.module';
import { DescriptionModule } from '../description/description.module';
import { FooterModule } from '../footer/footer-module';
import { HeaderToolbarModule } from '../header-toolbar/header-toolbar.module';
import { RelatedToolsModule } from '../related-tools/related-tools.module';
import { TagsModule } from '../tags/tags.module';
import { ToolHeadingModule } from '../tool-heading/tool-heading.module';
import { AppParentComponent } from './app-parent.component';
import { FollowButtonsModule } from '../follow-buttons/follow-buttons.module';
import { ShareButtonsModule } from '../share-buttons/share-buttons.module';

@NgModule({
  declarations: [AppParentComponent],
  imports: [
    CommonModule,
    AppParentRoutingModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    DescriptionModule,
    RelatedToolsModule,
    ShareButtonsModule,
    FollowButtonsModule,
  ],
})
export class AppParentModule {}
