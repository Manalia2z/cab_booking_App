import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSettingPageRoutingModule } from './profile-setting-routing.module';

import { ProfileSettingPage } from './profile-setting.page';
import { FooterPageModule } from 'src/app/driver/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSettingPageRoutingModule,
    FooterPageModule
  ],
  declarations: [ProfileSettingPage]
})
export class ProfileSettingPageModule {}
