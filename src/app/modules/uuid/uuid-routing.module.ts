import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UuidComponent } from './uuid.component';

const routes: Routes = [{ path: '', component: UuidComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UuidRoutingModule {}
