import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginWithNumberPage } from './login-with-number.page';

const routes: Routes = [
  {
    path: '',
    component: LoginWithNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginWithNumberPageRoutingModule {}
