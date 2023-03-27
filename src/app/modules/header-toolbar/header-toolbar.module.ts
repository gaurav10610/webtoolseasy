import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderToolbarComponent } from 'src/app/components/header-toolbar/header-toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [HeaderToolbarComponent],
})
export class HeaderToolbarModule {}
