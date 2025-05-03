import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRidesPageRoutingModule } from './my-rides-routing.module';

import { MyRidesPage } from './my-rides.page';
import { FooterPageModule } from 'src/app/driver/footer/footer.module';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRidesPageRoutingModule,
    FooterPageModule
  ],
  declarations: [MyRidesPage],
    providers : [Geolocation]
})
export class MyRidesPageModule {}
