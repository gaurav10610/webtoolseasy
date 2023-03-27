import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssFormatterRoutingModule } from './css-formatter-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CssFormatterComponent } from 'src/app/components/css-formatter/css-formatter.component';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';

@NgModule({
  declarations: [CssFormatterComponent],
  imports: [
    CommonModule,
    CssFormatterRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
  ],
})
export class CssFormatterModule {}
