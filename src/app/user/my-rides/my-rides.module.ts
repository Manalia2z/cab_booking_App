import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRidesPageRoutingModule } from './my-rides-routing.module';

import { MyRidesPage } from './my-rides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRidesPageRoutingModule
  ],
  declarations: [MyRidesPage]
})
export class MyRidesPageModule {}
