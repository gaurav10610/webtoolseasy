import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordGeneratorComponent } from 'src/app/components/password-generator/password-generator.component';

const routes: Routes = [{ path: '', component: PasswordGeneratorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordGeneratorRoutingModule {}
