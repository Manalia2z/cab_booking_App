import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { HomePage } from './home.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FooterPageModule
  ],
  declarations: [HomePage],
  providers: [Geolocation]
})
export class HomePageModule {}
