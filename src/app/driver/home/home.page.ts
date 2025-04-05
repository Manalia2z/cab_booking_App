import { Component, OnInit } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {

  constructor(private api:DriverapiService,private geolocation: Geolocation,    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController) { }
  aval_status:any;
  latitude: number | null = null;
  longitude: number | null = null;
  ttlPendingTrips:any;
  ttlCompletedTrips:any;
  ttlCancelTrips:any;
  ttl_schedule_trip:any;
  private loading: HTMLIonLoadingElement | null = null;
  ngOnInit() {
    this.api.driver_dashboard().subscribe((res:any)=>{
      console.log(res);
      this.ttlPendingTrips = res.data.ttl_pending_trip;
      this.ttlCompletedTrips = res.data.ttl_completed_trip
      this.ttlCancelTrips = res.data.ttl_cancel_trip
      this.ttl_schedule_trip = res.data.ttl_schedule_trip
    })
    
    localStorage.setItem('userType','driver');
    this.api.getDriverDetails().subscribe((res:any)=>{
      console.log(res);
      if(res.aval_status == 'active')
      {
        this.getCurrentLocation();
        this.aval_status = true;
      }else{
        this.aval_status = false;
      }
    })
  }
  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
    }).catch((error) => {
      console.error('Error getting location:', error);
    });
  }
  setAvailibilty()
  {
    
  }
  toggleNotification(event: any) {
    this.showLoading("Please Wait..");
    if (event.detail.checked) {
        this.getCurrentLocation();
        this.api.set_driver_availability('active',this.longitude,this.latitude).subscribe((res:any)=>{
          console.log(res);
          this.presentToast(res.msg);
          this.dismissLoader();

        })
        console.log("Push Notifications Enabled");
    } else {
      this.api.set_driver_availability('closed',this.longitude,this.latitude).subscribe((res:any)=>{
        this.presentToast(res.msg);
        this.dismissLoader();

      })
        console.log("Push Notifications Disabled");
    }
    this.dismissLoader();
}
async presentToast(msg:any) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 1500,
    position: 'top',
  });

  await toast.present();
}
async showLoading(msg: string) {
  this.loading = await this.loadingController.create({
    message: msg,
  });
  await this.loading.present();
}
async dismissLoader() {
  if (this.loading) {
    await this.loading.dismiss();
    this.loading = null;  // Reset the loader instance
  }
}


}
