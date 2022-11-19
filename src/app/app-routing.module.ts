import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDirectoryModule } from './modules/app-directory/app-directory.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { UuidModule } from './modules/uuid/uuid.module';

const routes: Routes = [
  { path: '', redirectTo: 'tools', pathMatch: 'full' },
  { path: 'tools', loadChildren: () => AppDirectoryModule },
  { path: 'tools/uuid', loadChildren: () => UuidModule },
  { path: 'tools/jwt', loadChildren: () => JwtModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
