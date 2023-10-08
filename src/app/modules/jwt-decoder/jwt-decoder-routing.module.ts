import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtDecoderComponent } from './jwt-decoder.component';

const routes: Routes = [{ path: '', component: JwtDecoderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JwtDecoderRoutingModule {}
