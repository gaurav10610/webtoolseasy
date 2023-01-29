import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextCompareComponent } from 'src/app/components/text-compare/text-compare.component';

const routes: Routes = [{ path: '', component: TextCompareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextCompareRoutingModule {}
