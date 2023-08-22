import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Base64EncodeComponent } from './base64-encode.component';

const routes: Routes = [{ path: '', component: Base64EncodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Base64EncodeRoutingModule {}
