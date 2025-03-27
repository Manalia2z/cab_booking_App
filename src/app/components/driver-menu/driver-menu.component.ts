import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.scss'],
  standalone:false
})
export class DriverMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem('userType','driver');
  }

}
