import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoToAudioConverterComponent } from './video-to-audio-converter.component';

const routes: Routes = [
  { path: '', component: VideoToAudioConverterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoToAudioConverterRoutingModule {}
