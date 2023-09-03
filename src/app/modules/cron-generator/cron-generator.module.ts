import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CronGeneratorRoutingModule } from './cron-generator-routing.module';
import { CronEditorModule } from 'ngx-cron-editor';
import { CronGeneratorComponent } from './cron-generator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CronGeneratorComponent],
  imports: [
    CommonModule,
    CronGeneratorRoutingModule,
    CronEditorModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatSelectModule,
  ],
})
export class CronGeneratorModule {}
