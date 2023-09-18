import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordCountRoutingModule } from './word-count-routing.module';
import { WordCountComponent } from './word-count.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [WordCountComponent],
  imports: [CommonModule, WordCountRoutingModule, MatInputModule],
})
export class WordCountModule {}
