import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverapiService } from 'src/app/driverapi.service';
@Component({
  selector: 'app-new-ride',
  templateUrl: './new-ride.component.html',
  styleUrls: ['./new-ride.component.scss'],
  standalone: false
})
export class NewRideComponent  implements OnInit {

  constructor(private api : DriverapiService) { }

  ngOnInit() {
    // this.api.driver_availibility_list().subscribe((res:any)=>{
    //   console.log(res);
    // })
  }

}
