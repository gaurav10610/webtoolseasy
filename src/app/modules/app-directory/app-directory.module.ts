import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDirectoryRoutingModule } from './app-directory-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AppDirectoryComponent } from 'src/app/components/app-directory/app-directory.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';

@NgModule({
  declarations: [AppDirectoryComponent],
  imports: [
    CommonModule,
    AppDirectoryRoutingModule,
    MatIconModule,
    MatButtonModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    FooterModule,
  ],
})
export class AppDirectoryModule {}
