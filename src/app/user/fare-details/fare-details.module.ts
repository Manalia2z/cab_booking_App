import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FareDetailsPageRoutingModule } from './fare-details-routing.module';

import { FareDetailsPage } from './fare-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FareDetailsPageRoutingModule
  ],
  declarations: [FareDetailsPage]
})
export class FareDetailsPageModule {}
