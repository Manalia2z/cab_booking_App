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
   loginForm : any = new FormGroup({
    "driver_review": new FormControl("", [Validators.required]),
    "review": new FormControl("", [Validators.required]),
    "trip_tbl_id": new FormControl("", [Validators.required]),
  });

   stars: number[] = [1, 2, 3, 4, 5];
   selectedRating = 4;
   trip_list:any;
   trip_status:any;
   tripId:any;
   imgpath:any;
   intervalId: any;
   tripAval : any;
  ngOnInit() {
    this.tripAval = true;
    this.loginForm.patchValue({
      "review" : "The ride was good."
    })
    this.imgpath = localStorage.getItem('imgpath');
 
    this.api.userTripList().subscribe((res:any)=>{
      console.log(res);
      this.trip_list = res.data.trip;
      if(res.data.trip[0]){
        this.tripId = res.data.trip[0].trip_tbl_id;
        this.trip_status = res.data.trip[0].trip_status;
      }

      if(this.tripId){
        if(res.data.trip[0].trip_status == 'pending')
          {
            this.IsRideConfirmed(this.tripId);
            this.tripAval = false;
          }
          else if(res.data.trip[0].trip_status == 'accepted')
          {
            this.IsPickOtpValidate(this.tripId);
            this.tripAval = false;
          }
          else if(res.data.trip[0].trip_status == 'confirm' || res.data.trip[0].trip_status == 'onboard')
            {
              this.IsRideCompleted(this.tripId);
              this.tripAval = false;
            }
          else if(res.data.trip[0].trip_status == 'completed')
            {
              this.trip_list = '';
              this.tripAval = true;
            }
        }
    })
  }
  rate(star: number) {
    this.selectedRating = star;
    // You can now send this.rating to your backend or use it in form
    console.log('User rated:', star);
  }
  getRideDet(status:any)
  {
    this.trip_status = status;
    this.api.userTripList().subscribe((res:any)=>{
      console.log(res);
      this.tripId = res.data.trip[0].trip_tbl_id;
      this.trip_list = res.data.trip;
      
    })
  }
  IsRideCompleted(tripId:any)
  {
    this.intervalId = setInterval(() => {
      console.log('Function called !! For Ride Completed Confirmation');
      this.api.IsRideCompleted(tripId).subscribe((res:any)=>{
        console.log(res);
        if(res.status == 'success' && (res.trip_status == 'completed') && (this.trip_status=='confirm' || this.trip_status=='onboard'))
        {
          console.log('OK');
          this.api.userTripList().subscribe((res1:any)=>{
            console.log(res1);
            this.trip_list = res1.data.trip;
            this.tripId = res1.data.trip[0].trip_tbl_id;
            this.trip_status = res1.data.trip[0].trip_status;;
            
            console.log(res1,'==========');
            this.presentToast("Your Ride Is Completed...!!");

            this.tripId = res1.data.trip[0].trip_tbl_id;
            this.cdr.detectChanges(); 
            this.stopInterval();
          })
        }

      })
    }, 5000); 
  }
  IsPickOtpValidate(tripId:any)
  {
    this.intervalId = setInterval(() => {
      console.log('Function called at 5 second intervals! For OTP Confirmation');
      this.api.IsRideConfirmed(tripId).subscribe((res:any)=>{
        // console.log(res);
        if(res.status == 'success' && (res.trip_status == 'confirm' || res.trip_status == 'onboard') && this.trip_status=='accepted')
        {
          console.log('OK');
          this.api.userTripList().subscribe((res1:any)=>{
            console.log(res1);
            this.trip_list = res1.data.trip;
            this.tripId = res1.data.trip[0].trip_tbl_id;
            this.trip_status = res1.data.trip[0].trip_status;;
            
            console.log(res1,'==========');
            this.presentToast("Your Ride Is Confirmed...!!");

            this.tripId = res1.data.trip[0].trip_tbl_id;
            this.cdr.detectChanges(); 
            this.stopInterval();
            this.IsRideCompleted(this.tripId);
          })
        }

      })
    }, 5000); 
  }
  IsRideConfirmed(tripId:any)
  {
    this.intervalId = setInterval(() => {
      console.log('Is Ride Accepted??');
      this.api.isTripConfirmed(tripId).subscribe((res:any)=>{
        console.log(res);
        if(res.status == 'success' && res.trip_status == 'accepted' && this.trip_status=='pending')
        {
          console.log('OK');
          this.trip_status = 'accepted';
          this.api.userTripList().subscribe((res1:any)=>{
            console.log(res1);
            this.cdr.detectChanges(); 
            this.trip_list = res1.data.trip;
            this.tripId = res1.data.trip[0].trip_tbl_id;
            this.stopInterval();
          })
        }

      })
    }, 5000); 
  }
  submitReview()
  {
    this.loginForm.patchValue({
      "driver_review" : this.selectedRating,
      "trip_tbl_id" : this.tripId
    })
    if(this.loginForm.valid)
    {
      this.api.saveDriverReview(this.loginForm.value).subscribe((res:any)=>{
        if(res.status == 'success')
        {
          this.presentToast(res.msg);
          this.router.navigate(['/user/home']);
        }else{
          this.presentToast(res.msg);
          this.router.navigate(['/user/home']);
        }
        console.log(res);
      })
    }
  }
  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
  async showLoading(msg:any) {
    const loading = await this.loadingController.create({
      message: msg,
    });

    loading.present();
  }
  async dismissLoader()
  {
    this.loadingController.dismiss();
  }
  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('Interval stopped!');
    }
  }


}
