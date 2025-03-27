import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginWithNumberPageRoutingModule } from './login-with-number-routing.module';

import { LoginWithNumberPage } from './login-with-number.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginWithNumberPageRoutingModule
  ],
  declarations: [LoginWithNumberPage]
})
export class LoginWithNumberPageModule {}
