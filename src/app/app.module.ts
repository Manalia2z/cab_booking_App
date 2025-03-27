import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { DriverMenuComponent } from './components/driver-menu/driver-menu.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent,UserMenuComponent,DriverMenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
