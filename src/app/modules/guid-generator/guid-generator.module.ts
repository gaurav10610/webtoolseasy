import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidGeneratorRoutingModule } from './guid-generator-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GuidGeneratorComponent } from './guid-generator.component';

@NgModule({
  declarations: [GuidGeneratorComponent],
  imports: [
    CommonModule,
    GuidGeneratorRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatInputModule,
  ],
})
export class GuidGeneratorModule {}
