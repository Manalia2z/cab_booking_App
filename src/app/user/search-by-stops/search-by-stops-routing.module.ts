import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchByStopsPage } from './search-by-stops.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByStopsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchByStopsPageRoutingModule {}
