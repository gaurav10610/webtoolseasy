import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuidGeneratorComponent } from './guid-generator.component';

const routes: Routes = [{ path: '', component: GuidGeneratorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuidGeneratorRoutingModule {}
