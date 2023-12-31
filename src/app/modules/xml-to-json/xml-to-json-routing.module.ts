import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XmlToJsonComponent } from './xml-to-json.component';

const routes: Routes = [{ path: '', component: XmlToJsonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XmlToJsonRoutingModule {}
