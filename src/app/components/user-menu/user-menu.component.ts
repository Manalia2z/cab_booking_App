import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  standalone:false
})
export class UserMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem('userType','user');
  }

}
