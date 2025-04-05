import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  standalone:false
})
export class UserMenuComponent  implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    localStorage.setItem('userType','user');
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
    location.href='/login';
  }
}
