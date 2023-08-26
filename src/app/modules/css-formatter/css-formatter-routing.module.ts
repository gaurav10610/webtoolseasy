import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CssFormatterComponent } from './css-formatter.component';

const routes: Routes = [{ path: '', component: CssFormatterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CssFormatterRoutingModule {}
