import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVehicleDocumentsPageRoutingModule } from './add-vehicle-documents-routing.module';

import { AddVehicleDocumentsPage } from './add-vehicle-documents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVehicleDocumentsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddVehicleDocumentsPage]
})
export class AddVehicleDocumentsPageModule {}
