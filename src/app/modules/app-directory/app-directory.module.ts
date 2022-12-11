import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDirectoryRoutingModule } from './app-directory-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppDirectoryComponent } from 'src/app/components/app-directory/app-directory.component';

@NgModule({
  declarations: [AppDirectoryComponent],
  imports: [
    CommonModule,
    AppDirectoryRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class AppDirectoryModule {}
