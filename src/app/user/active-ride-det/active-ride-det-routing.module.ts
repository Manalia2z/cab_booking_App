import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveRideDetPage } from './active-ride-det.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveRideDetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveRideDetPageRoutingModule {}
