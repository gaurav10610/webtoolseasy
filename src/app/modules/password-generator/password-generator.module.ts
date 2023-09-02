import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { PasswordGeneratorRoutingModule } from './password-generator-routing.module';
import { PasswordGeneratorComponent } from './password-generator.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [PasswordGeneratorComponent],
  imports: [
    CommonModule,
    PasswordGeneratorRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    ClipboardModule,
  ],
})
export class PasswordGeneratorModule {}
