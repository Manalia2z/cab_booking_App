import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteRideDetPageRoutingModule } from './complete-ride-det-routing.module';

import { FooterPageModule } from 'src/app/driver/footer/footer.module';
import { CompleteRideDetPage } from './complete-ride-det.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteRideDetPageRoutingModule,
    FooterPageModule
  ],
  declarations: [CompleteRideDetPage]
})
export class CompleteRideDetPageModule {}
