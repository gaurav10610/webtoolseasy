import { UuidModule } from './uuid/uuid.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDirectoryModule } from './app-directory/app-directory.module';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'app', loadChildren: () => AppDirectoryModule },
  { path: 'uuid', loadChildren: () => UuidModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
