import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchLocationOutstationPageRoutingModule } from './search-location-outstation-routing.module';

import { SearchLocationOutstationPage } from './search-location-outstation.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchLocationOutstationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SearchLocationOutstationPage],
  providers : [Geolocation]
})
export class SearchLocationOutstationPageModule {}
