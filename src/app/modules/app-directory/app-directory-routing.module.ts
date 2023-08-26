import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDirectoryComponent } from './app-directory.component';

const routes: Routes = [{ path: '', component: AppDirectoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDirectoryRoutingModule {}
