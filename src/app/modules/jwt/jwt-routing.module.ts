import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtComponent } from './jwt.component';

const routes: Routes = [{ path: '', component: JwtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JwtRoutingModule {}
