import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { FooterPage } from './footer.page';
import { FooterPageRoutingModule } from 'src/app/driver/footer/footer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterPageRoutingModule
  ],
  declarations: [FooterPage],
  exports : [FooterPage]
  
})
export class FooterPageModule {}
