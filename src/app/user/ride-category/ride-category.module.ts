import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideCategoryPageRoutingModule } from './ride-category-routing.module';

import { RideCategoryPage } from './ride-category.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideCategoryPageRoutingModule,
    FooterPageModule
  ],
  declarations: [RideCategoryPage]
})
export class RideCategoryPageModule {}
