import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenRecorderComponent } from 'src/app/components/screen-recorder/screen-recorder.component';

const routes: Routes = [{ path: '', component: ScreenRecorderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenRecorderRoutingModule {}
