import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UuidVersion1GeneratorRoutingModule } from './uuid-version1-generator-routing.module';
import { UuidVersion1GeneratorComponent } from './uuid-version1-generator.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [UuidVersion1GeneratorComponent],
  imports: [
    CommonModule,
    UuidVersion1GeneratorRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatInputModule,
  ],
})
export class UuidVersion1GeneratorModule {}
