import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchLocationOutstationPage } from './search-location-outstation.page';

const routes: Routes = [
  {
    path: '',
    component: SearchLocationOutstationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchLocationOutstationPageRoutingModule {}
