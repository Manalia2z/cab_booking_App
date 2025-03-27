import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverDocumentVerifyPage } from './driver-document-verify.page';

const routes: Routes = [
  {
    path: '',
    component: DriverDocumentVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverDocumentVerifyPageRoutingModule {}
