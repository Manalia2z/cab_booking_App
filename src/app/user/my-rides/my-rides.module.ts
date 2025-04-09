import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRidesPageRoutingModule } from './my-rides-routing.module';

import { MyRidesPage } from './my-rides.page';
import { FooterPageModule } from 'src/app/user/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRidesPageRoutingModule,FooterPageModule,ReactiveFormsModule
  ],
  declarations: [MyRidesPage]
})
export class MyRidesPageModule {}
