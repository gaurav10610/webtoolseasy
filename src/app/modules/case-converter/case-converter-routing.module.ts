import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseConverterComponent } from './case-converter.component';

const routes: Routes = [{ path: '', component: CaseConverterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseConverterRoutingModule {}
