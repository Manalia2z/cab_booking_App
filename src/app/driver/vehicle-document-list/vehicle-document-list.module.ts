import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleDocumentListPageRoutingModule } from './vehicle-document-list-routing.module';

import { VehicleDocumentListPage } from './vehicle-document-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleDocumentListPageRoutingModule
  ],
  declarations: [VehicleDocumentListPage]
})
export class VehicleDocumentListPageModule {}
