import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleRegistrationPage } from './vehicle-registration.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRegistrationPageRoutingModule {}
