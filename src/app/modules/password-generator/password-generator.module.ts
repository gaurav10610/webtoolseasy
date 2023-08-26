import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { RelatedToolsModule } from 'src/app/modules/related-tools/related-tools.module';

import { PasswordGeneratorRoutingModule } from './password-generator-routing.module';
import { PasswordGeneratorComponent } from './password-generator.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShareButtonsModule } from 'src/app/modules/share-buttons/share-buttons.module';
import { FollowButtonsModule } from 'src/app/modules/follow-buttons/follow-buttons.module';

@NgModule({
  declarations: [PasswordGeneratorComponent],
  imports: [
    CommonModule,
    PasswordGeneratorRoutingModule,
    ShareButtonsModule,
    FollowButtonsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    ClipboardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    DescriptionModule,
    RelatedToolsModule,
  ],
})
export class PasswordGeneratorModule {}
