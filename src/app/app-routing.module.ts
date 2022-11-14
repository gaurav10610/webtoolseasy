import { UuidModule } from './uuid/uuid.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDirectoryModule } from './app-directory/app-directory.module';

const routes: Routes = [
  { path: '', redirectTo: 'apps', pathMatch: 'full' },
  { path: 'apps', loadChildren: () => AppDirectoryModule },
  { path: 'apps/uuid', loadChildren: () => UuidModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
