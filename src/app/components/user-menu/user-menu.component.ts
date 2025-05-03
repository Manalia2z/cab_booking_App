import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserapiService } from 'src/app/userapi.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  standalone:false
})
export class UserMenuComponent  implements OnInit {

  constructor(private router: Router,private menuCtrl: MenuController,private api:UserapiService) { }
  det:any;
  ngOnInit() {
    localStorage.setItem('userType','user');
    this.api.getUserDetails().subscribe((res:any)=>{
      console.log("Menu Det ",res);
      this.det = res.data.det;
    })
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.menuCtrl.close();
    location.href='/login';
  }
  closeMenu() {
    this.menuCtrl.close();
  }
}
