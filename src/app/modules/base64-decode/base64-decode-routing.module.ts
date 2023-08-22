import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Base64DecodeComponent } from './base64-decode.component';

const routes: Routes = [{ path: '', component: Base64DecodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Base64DecodeRoutingModule {}
