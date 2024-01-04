import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsCompilerComponent } from './js-compiler.component';

const routes: Routes = [{ path: '', component: JsCompilerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsCompilerRoutingModule {}
