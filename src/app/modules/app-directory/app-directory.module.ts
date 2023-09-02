import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDirectoryRoutingModule } from './app-directory-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AppDirectoryComponent } from './app-directory.component';

@NgModule({
  declarations: [AppDirectoryComponent],
  imports: [CommonModule, AppDirectoryRoutingModule, MatIconModule],
})
export class AppDirectoryModule {}
