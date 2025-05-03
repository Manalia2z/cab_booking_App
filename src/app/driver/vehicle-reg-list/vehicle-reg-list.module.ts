import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleRegListPageRoutingModule } from './vehicle-reg-list-routing.module';

import { VehicleRegListPage } from './vehicle-reg-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleRegListPageRoutingModule
  ],
  declarations: [VehicleRegListPage]
})
export class VehicleRegListPageModule {}
