import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageCompressionComponent } from 'src/app/components/image-compression/image-compression.component';

const routes: Routes = [{ path: '', component: ImageCompressionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageCompressionRoutingModule {}
