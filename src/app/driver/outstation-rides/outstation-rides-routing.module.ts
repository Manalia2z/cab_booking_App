import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutstationRidesPage } from './outstation-rides.page';

const routes: Routes = [
  {
    path: '',
    component: OutstationRidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutstationRidesPageRoutingModule {}
