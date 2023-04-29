import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonViewerComponent } from 'src/app/components/json-viewer/json-viewer.component';

const routes: Routes = [{ path: '', component: JsonViewerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsonViewerRoutingModule {}
