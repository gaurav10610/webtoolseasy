import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlFormatterComponent } from './html-formatter.component';

const routes: Routes = [{ path: '', component: HtmlFormatterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HtmlFormatterRoutingModule {}
