import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Platform } from '@ionic/angular';
import { UserapiService } from '../../userapi.service';
import { Subject } from 'rxjs';
import { debounceTime, throttleTime, switchMap } from 'rxjs/operators';
import { DriverapiService } from '../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.page.html',
  styleUrls: ['./my-rides.page.scss'],
  standalone:false
})
export class MyRidesPage implements OnInit {

  constructor(private platform: Platform,private http: HttpClient,private api : UserapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef
  ) {

   }
   trip_list:any;
   trip_status:any;
   tripId:any;
   imgpath:any;
   intervalId: any;
  ngOnInit() {
    this.imgpath = localStorage.getItem('imgpath');
 
    this.api.userTripList().subscribe((res:any)=>{
      console.log(res);
      this.trip_list = res.data.trip;
      this.tripId = res.data.trip[0].trip_tbl_id;
      this.trip_status = res.data.trip[0].trip_status;
      if(res.data.trip[0].trip_status == 'pending')
        {
          this.IsRideConfirmed(this.tripId);
        }

    })


  }

  getRideDet(status:any)
  {
    this.trip_status = status;
    this.api.userTripList().subscribe((res:any)=>{
      console.log(res);
      this.trip_list = res.data.trip;
      
    })
  }

  IsRideConfirmed(tripId:any)
  {
    this.intervalId = setInterval(() => {
      console.log('Function called at 5 second intervals!');
      this.api.isTripConfirmed(tripId).subscribe((res:any)=>{
        console.log(res);
        if(res.status == 'success' && res.trip_status == 'accepted' && this.trip_status=='pending')
        {
          console.log('OK');
          this.trip_status = 'accepted';
          this.cdr.detectChanges(); 
          this.api.userTripList().subscribe((res:any)=>{
            console.log(res);
            this.trip_list = res.data.trip;
            this.tripId = res.data.trip[0].trip_tbl_id;
            this.stopInterval();
            
      
          })
        }

      })
    }, 5000); 
  }
  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('Interval stopped!');
    }
  }


}
