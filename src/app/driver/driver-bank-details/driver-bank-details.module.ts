import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverBankDetailsPageRoutingModule } from './driver-bank-details-routing.module';

import { DriverBankDetailsPage } from './driver-bank-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverBankDetailsPageRoutingModule
  ],
  declarations: [DriverBankDetailsPage]
})
export class DriverBankDetailsPageModule {}
