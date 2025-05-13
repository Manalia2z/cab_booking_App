import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutstationRidesPageRoutingModule } from './outstation-rides-routing.module';

import { OutstationRidesPage } from './outstation-rides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutstationRidesPageRoutingModule
  ],
  declarations: [OutstationRidesPage]
})
export class OutstationRidesPageModule {}
