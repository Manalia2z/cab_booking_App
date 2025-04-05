import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideVerificationPageRoutingModule } from './ride-verification-routing.module';

import { RideVerificationPage } from './ride-verification.page';
import { FooterPageModule } from '../../driver/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideVerificationPageRoutingModule,
    FooterPageModule
  ],
  declarations: [RideVerificationPage]
})
export class RideVerificationPageModule {}
