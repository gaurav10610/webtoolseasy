import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UuidRoutingModule } from './uuid-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { UuidComponent } from 'src/app/components/uuid/uuid.component';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';

@NgModule({
  declarations: [UuidComponent],
  imports: [
    CommonModule,
    UuidRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
  ],
})
export class UuidModule {}
