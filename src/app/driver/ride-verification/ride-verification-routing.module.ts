import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideVerificationPage } from './ride-verification.page';

const routes: Routes = [
  {
    path: '',
    component: RideVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideVerificationPageRoutingModule {}
