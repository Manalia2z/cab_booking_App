import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveRidePage } from './active-ride.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveRidePageRoutingModule {}
