import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverFeedbackListPageRoutingModule } from './driver-feedback-list-routing.module';

import { DriverFeedbackListPage } from './driver-feedback-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverFeedbackListPageRoutingModule
  ],
  declarations: [DriverFeedbackListPage]
})
export class DriverFeedbackListPageModule {}
