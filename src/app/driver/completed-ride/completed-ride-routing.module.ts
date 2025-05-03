import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedRidePage } from './completed-ride.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedRidePageRoutingModule {}
