import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverBankDetailsPage } from './driver-bank-details.page';

const routes: Routes = [
  {
    path: '',
    component: DriverBankDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverBankDetailsPageRoutingModule {}
