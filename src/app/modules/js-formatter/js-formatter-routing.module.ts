import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsFormatterComponent } from 'src/app/components/js-formatter/js-formatter.component';

const routes: Routes = [{ path: '', component: JsFormatterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsFormatterRoutingModule {}
