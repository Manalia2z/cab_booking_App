import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverDocumentVerifyPageRoutingModule } from './driver-document-verify-routing.module';

import { DriverDocumentVerifyPage } from './driver-document-verify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverDocumentVerifyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DriverDocumentVerifyPage]
})
export class DriverDocumentVerifyPageModule {}
