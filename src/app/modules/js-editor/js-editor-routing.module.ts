import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsEditorComponent } from './js-editor.component';

const routes: Routes = [{ path: '', component: JsEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsEditorRoutingModule {}
