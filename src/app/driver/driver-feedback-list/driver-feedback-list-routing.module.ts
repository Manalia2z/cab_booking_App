import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverFeedbackListPage } from './driver-feedback-list.page';

const routes: Routes = [
  {
    path: '',
    component: DriverFeedbackListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverFeedbackListPageRoutingModule {}
