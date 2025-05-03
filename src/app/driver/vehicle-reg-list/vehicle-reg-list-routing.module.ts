import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleRegListPage } from './vehicle-reg-list.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleRegListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRegListPageRoutingModule {}
