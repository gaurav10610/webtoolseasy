import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoConverterComponent } from './video-converter.component';

const routes: Routes = [{ path: '', component: VideoConverterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoConverterRoutingModule {}
