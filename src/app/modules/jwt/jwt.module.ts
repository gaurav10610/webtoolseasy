import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtRoutingModule } from './jwt-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JwtComponent } from 'src/app/components/jwt/jwt.component';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';

@NgModule({
  declarations: [JwtComponent],
  imports: [
    CommonModule,
    JwtRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
  ],
})
export class JwtModule {}
