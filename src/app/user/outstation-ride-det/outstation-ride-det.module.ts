import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutstationRideDetPageRoutingModule } from './outstation-ride-det-routing.module';

import { OutstationRideDetPage } from './outstation-ride-det.page';
import { FooterPageModule } from 'src/app/user/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutstationRideDetPageRoutingModule,
    FooterPageModule,
    ReactiveFormsModule
  ],
  declarations: [OutstationRideDetPage]
})
export class OutstationRideDetPageModule {}
