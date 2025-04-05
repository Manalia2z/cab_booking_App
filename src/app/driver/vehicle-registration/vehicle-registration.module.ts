import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleRegistrationPageRoutingModule } from './vehicle-registration-routing.module';

import { VehicleRegistrationPage } from './vehicle-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleRegistrationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VehicleRegistrationPage]
})
export class VehicleRegistrationPageModule {}
