import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteRideDetPage } from './complete-ride-det.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteRideDetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteRideDetPageRoutingModule {}
