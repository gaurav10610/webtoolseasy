import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDirectoryRoutingModule } from './app-directory-routing.module';
import { AppDirectoryComponent } from './app-directory/app-directory.component';


@NgModule({
  declarations: [
    AppDirectoryComponent
  ],
  imports: [
    CommonModule,
    AppDirectoryRoutingModule
  ]
})
export class AppDirectoryModule { }
