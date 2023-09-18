import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UuidVersion4GeneratorRoutingModule } from './uuid-version4-generator-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UuidVersion4GeneratorComponent } from './uuid-version4-generator.component';

@NgModule({
  declarations: [UuidVersion4GeneratorComponent],
  imports: [
    CommonModule,
    UuidVersion4GeneratorRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatInputModule,
  ],
})
export class UuidVersion4GeneratorModule {}
