import { Component, OnInit,QueryList, ViewChildren, ElementRef,ChangeDetectorRef  } from '@angular/core';
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
  selector: 'app-active-ride',
  templateUrl: './active-ride.page.html',
  styleUrls: ['./active-ride.page.scss'],
  standalone : false
})
export class ActiveRidePage implements OnInit {

  constructor(private platform: Platform,private http: HttpClient,private api : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef) {

   }
   loginForm : any = new FormGroup({
    "otp1": new FormControl("", [Validators.required]),
    "otp2": new FormControl("", [Validators.required]),
    "otp3": new FormControl("", [Validators.required]),
    "otp4": new FormControl("", [Validators.required]),
    "otp": new FormControl("", [Validators.required]),
    "trip_tbl_id": new FormControl("", [Validators.required]),

  });
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

accepted_trip :any;
otp:any;
trip_status:any;
noActiveTrip:boolean = false;

  ngOnInit() 
  {
    this.accepted_trip = '';
    this.trip_status='pending';
      this.api.acceptedTrips().subscribe((res:any)=>{
        console.log(res);
        if(res.status == 'success')
        {
          this.noActiveTrip = false;
            this.accepted_trip = res.data;
              if(res.data[0]){
              this.trip_status = res.data[0].trip_status;
              
              }
            console.log("-------------",res,this.trip_status);
            this.loginForm.patchValue({
              "trip_tbl_id" : res.data[0].trip_tbl_id
            })
      }else{
        this.noActiveTrip = true;
        this.accepted_trip = [];
      }
    })
  }
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      this.ngOnInit();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
  validateOtp()
  {
    this.loginForm.patchValue({
      "otp" : '0'
    })
    if(this.loginForm.valid)
    {
      this.otp = this.loginForm.value.otp1 + '' +this.loginForm.value.otp2+ '' +this.loginForm.value.otp3+ '' +this.loginForm.value.otp4;  
      console.log(this.loginForm.value,this.otp);
      this.loginForm.patchValue({
        "otp" : this.otp
      })
      this.api.check_userPickupOtp(this.loginForm.value).subscribe((res:any)=>{
        console.log(res);
        // this.showLoading("Please Wait..! Validating OTP");
        if(res.status == 'success')
        {
          // this.dismissLoader();
          this.presentToast(res.msg);
          this.api.confirmTrips('confirm').subscribe((res1:any)=>{
            console.log(res1);
            this.accepted_trip = res1.data;
            this.trip_status = res1.data[0].trip_status;
            this.cdr.detectChanges(); 
          })
        }
        else{
          // this.dismissLoader();
          this.presentToast(res.msg);
        }
        // this.dismissLoader();

      })
    }
    else{
      this.markFormGroupTouched(this.loginForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  completeRide(tripId:any)
  {
    this.api.completeRide(tripId).subscribe((res:any)=>{
      if(res.status == 'success')
      {
        this.presentToast(res.msg);
        this.cdr.detectChanges(); 
        // this.ngOnInit();
      }else{
        this.presentToast(res.msg);
      }
    })
    console.log(tripId);
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

  onOtpKeyUp(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Move to next input if digit entered
    if (value.length === 1 && index < 3) {
      const nextInput = this.otpInputs.toArray()[index + 1];
      nextInput.nativeElement.focus();
    }

    // Move to previous input if backspace on empty
    if (event.key === 'Backspace' && value.length === 0 && index > 0) {
      const prevInput = this.otpInputs.toArray()[index - 1];
      prevInput.nativeElement.focus();
    }
  }
}
