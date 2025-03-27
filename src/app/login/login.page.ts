import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';
import { DriverapiService } from '../driverapi.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone : false
})
export class LoginPage implements OnInit {

  constructor(private userApi : UserapiService,private driverApi : DriverapiService) { }

  ngOnInit() {
     const userType = localStorage.getItem('userType');
     const token = localStorage.getItem('token');
  }

}
