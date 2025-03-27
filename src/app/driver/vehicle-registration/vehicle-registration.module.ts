import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleRegistrationPageRoutingModule } from './vehicle-registration-routing.module';

import { VehicleRegistrationPage } from './vehicle-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleRegistrationPageRoutingModule
  ],
  declarations: [VehicleRegistrationPage]
})
export class VehicleRegistrationPageModule {}
