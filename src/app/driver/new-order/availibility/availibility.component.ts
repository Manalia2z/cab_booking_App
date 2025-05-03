import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverapiService } from 'src/app/driverapi.service';
@Component({
  selector: 'app-availibility',
  templateUrl: './availibility.component.html',
  styleUrls: ['./availibility.component.scss'],
  standalone: false
})
export class AvailibilityComponent  implements OnInit {

  constructor(private api : DriverapiService) { }
  list : any;
  ngOnInit() {
    this.api.driver_availibility_list().subscribe((res:any)=>{
      this.list = res.data.list
      console.log("driver_availibility_list",res);
    })
  }

}
