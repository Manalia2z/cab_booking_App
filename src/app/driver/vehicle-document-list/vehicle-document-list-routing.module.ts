import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleDocumentListPage } from './vehicle-document-list.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleDocumentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleDocumentListPageRoutingModule {}
