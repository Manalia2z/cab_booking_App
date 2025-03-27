import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveRidePageRoutingModule } from './active-ride-routing.module';

import { ActiveRidePage } from './active-ride.page';
import { FooterPageModule } from 'src/app/driver/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveRidePageRoutingModule,
    FooterPageModule
  ],
  declarations: [ActiveRidePage]
})
export class ActiveRidePageModule {}
