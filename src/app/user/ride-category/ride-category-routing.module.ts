import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideCategoryPage } from './ride-category.page';

const routes: Routes = [
  {
    path: '',
    component: RideCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideCategoryPageRoutingModule {}
