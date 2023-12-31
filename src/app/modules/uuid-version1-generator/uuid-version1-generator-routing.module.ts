import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UuidVersion1GeneratorComponent } from './uuid-version1-generator.component';

const routes: Routes = [
  { path: '', component: UuidVersion1GeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UuidVersion1GeneratorRoutingModule {}
