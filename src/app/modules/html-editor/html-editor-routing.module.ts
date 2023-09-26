import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlEditorComponent } from './html-editor.component';

const routes: Routes = [{ path: '', component: HtmlEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HtmlEditorRoutingModule {}
