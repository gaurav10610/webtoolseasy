import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonFormatterComponent } from 'src/app/components/json-formatter/json-formatter.component';

const routes: Routes = [{ path: '', component: JsonFormatterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsonFormatterRoutingModule {}
