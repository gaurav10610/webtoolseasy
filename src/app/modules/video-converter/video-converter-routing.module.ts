import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoConverterComponent } from 'src/app/components/video-converter/video-converter.component';

const routes: Routes = [{ path: '', component: VideoConverterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoConverterRoutingModule {}
