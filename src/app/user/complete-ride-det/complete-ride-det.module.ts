import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteRideDetPageRoutingModule } from './complete-ride-det-routing.module';

import { CompleteRideDetPage } from './complete-ride-det.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteRideDetPageRoutingModule
  ],
  declarations: [CompleteRideDetPage]
})
export class CompleteRideDetPageModule {}
