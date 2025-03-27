import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterPageRoutingModule } from './footer-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FooterPage } from './footer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterPageRoutingModule
  ],
  declarations: [FooterPage],
  exports:[FooterPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooterPageModule {}
