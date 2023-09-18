import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UuidVersion4GeneratorComponent } from './uuid-version4-generator.component';

const routes: Routes = [
  { path: '', component: UuidVersion4GeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UuidVersion4GeneratorRoutingModule {}
