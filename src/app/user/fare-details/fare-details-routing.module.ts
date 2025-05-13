import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FareDetailsPage } from './fare-details.page';

const routes: Routes = [
  {
    path: '',
    component: FareDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FareDetailsPageRoutingModule {}
