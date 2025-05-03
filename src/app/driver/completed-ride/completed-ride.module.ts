import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedRidePageRoutingModule } from './completed-ride-routing.module';

import { CompletedRidePage } from './completed-ride.page';
import { FooterPageModule } from 'src/app/driver/footer/footer.module';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedRidePageRoutingModule,
    FooterPageModule
  ],
  declarations: [CompletedRidePage],
   providers : [Geolocation]
})
export class CompletedRidePageModule {}
