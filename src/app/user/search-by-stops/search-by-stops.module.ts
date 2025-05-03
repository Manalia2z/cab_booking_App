import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchByStopsPageRoutingModule } from './search-by-stops-routing.module';

import { SearchByStopsPage } from './search-by-stops.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchByStopsPageRoutingModule,
    ReactiveFormsModule,
    FooterPageModule
  ],
  declarations: [SearchByStopsPage],
  providers : [Geolocation]
})
export class SearchByStopsPageModule {}
