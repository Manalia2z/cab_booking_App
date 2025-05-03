import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DriverapiService } from './../../driverapi.service';
@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.scss'],
  standalone:false
})
export class DriverMenuComponent  implements OnInit {

  constructor(public route :Router,private menuCtrl: MenuController,private api:DriverapiService) { }
  det:any;
  ngOnInit() {
    localStorage.setItem('userType','driver');
    this.api.getDriverDetails().subscribe((res:any)=>{
      console.log("Menu Det ",res);
      this.det = res.det.driver_det;
      console.log("MEnuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu ",this.det,'det');

    })
  }
  logout()
  {
    localStorage.clear();
    this.route.navigate(['/login']);
    this.menuCtrl.close();
    location.href='/login';

  }
  closeMenu() {
    this.menuCtrl.close();
  }
}
