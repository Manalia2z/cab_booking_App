import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVehicleDocumentsPage } from './add-vehicle-documents.page';

const routes: Routes = [
  {
    path: '',
    component: AddVehicleDocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVehicleDocumentsPageRoutingModule {}
