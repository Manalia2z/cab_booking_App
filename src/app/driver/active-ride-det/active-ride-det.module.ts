import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveRideDetPageRoutingModule } from './active-ride-det-routing.module';

import { ActiveRideDetPage } from './active-ride-det.page';
import { FooterPageModule } from 'src/app/driver/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveRideDetPageRoutingModule,
    ReactiveFormsModule,
    FooterPageModule
  ],
  declarations: [ActiveRideDetPage]
})
export class ActiveRideDetPageModule {}
