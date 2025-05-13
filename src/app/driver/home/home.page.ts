import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController,ModalController  } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText, IonThumbnail } from '@ionic/angular/standalone';
import { PayDueTodayComponent } from 'src/app/components/pay-due-today/pay-due-today.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false,
  
})
export class HomePage implements OnInit {

  constructor(private api:DriverapiService,private geolocation: Geolocation,    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private toastController: ToastController) { }
  aval_status:any;
  latitude: number | null = null;
  longitude: number | null = null;
  ttlPendingTrips:any;
  ttlCompletedTrips:any;
  ttlCancelTrips:any;
  ttl_schedule_trip:any;
  trip_list:any = [];
  imgpath:any ;
  det:any;
  tripAval:any;
  ActiveTrip:any;
  ttlActiveTrips:any;
  todayPaymentDue:any;
  locationInterval: any;

  private loading: HTMLIonLoadingElement | null = null;
  ionViewWillEnter() {
    this.ngOnInit();
  }
  ngOnInit() {
    this.todayPaymentDue = false;
    localStorage.setItem('userType','driver');
    this.api.getDriverDetails().subscribe((res:any)=>{
      console.log(res);
      this.det = res.det.driver_det;
      // if(res.aval_status == 'active')
      // {
      //   this.getCurrentLocation();
      //   this.aval_status = true;
      // }else{
      //   this.aval_status = false;
      // }
    })

    this.trip_list= [];
    if (!localStorage.getItem('firstLoadDone')) {
      localStorage.setItem('firstLoadDone', 'true');
      location.reload(); // Refresh the page
    }
    this.api.checkDriverTodayPayment().subscribe((res:any)=>{
      console.log('checkDriverTodayPayment ---------- ',res);
      if(res.status == 'success'){
       console.log("Payment Due Today",res);
          this.getCurrentLocation();
          this.aval_status = true;
          this.todayPaymentDue = true;
          console.log("No Payment Due Today");
          this.api.getDriverDetails().subscribe((res:any)=>{
           
            if(res.aval_status == 'active')
            {
              this.aval_status = true;
              this.startLocationTracking();

            }else{
              clearInterval(this.locationInterval);
              this.aval_status = false;
            }
          })
        }
      else
      {
        this.aval_status = false;
        this.todayPaymentDue = false;
        console.log("Payment Due Today",this.todayPaymentDue,'aval_status',this.aval_status);
      }
    })

    this.imgpath = localStorage.getItem('imgpath');
    this.api.driver_dashboard().subscribe((res:any)=>{
      console.log(res);
      this.ttlPendingTrips = res.data.ttl_pending_trip;
      this.ttlCompletedTrips = res.data.ttl_completed_trip;
      this.ttlCancelTrips = res.data.ttl_cancel_trip;
      this.ttl_schedule_trip = res.data.ttl_schedule_trip;
    })
    this.api.AllActiveRidesOfDriver().subscribe((res:any)=>{
      console.log("AllActiveRidesOfDriver",res);
      if(res.status == 'success'){
        this.ActiveTrip = true;
        this.ttlActiveTrips = res.data.ttlTrip;
      }else{
        this.ActiveTrip = false;

      }
    })

    this.api.tripList().subscribe((res:any)=>{
      console.log(res);
      if(res.status == 'success'){
        this.trip_list = res.data;
        this.tripAval = true;
      }else{
        this.tripAval = false;

      }
    })


  }
  openRideList()
  {
    this.router.navigate(['/driver/my-rides']);
  }
  openOutstationList()
  {
    this.router.navigate(['/driver/outstation-rides']);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'New Ride Request',
      subHeader: 'New ride is available Near you',
      message: 'Do You want to accept the ride ?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'ok-button',
          handler: () => {
           this.accpetRide();
            console.log('Alert confirmed');
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.setResult(role ?? 'unknown');
  }
  accpetRide()
  {
    alert("Ride Accepted");
  }
  setResult(role: string) {
    console.log(`Dismissed with role: ${role}`);
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
  vehicleId:any;

  async acceptUserTrip(trip_id: any) {
    this.api.vehicle_reg_verified_list().subscribe(async (res: any) => {
      const vehicleList = res.data.list;
      if (vehicleList.length === 0) {
        this.presentToast("No vehicle registered for this driver.Please Go In Profile Setting To Register Vehicle.");
        return;
      }
      console.log(vehicleList);
      const inputs = vehicleList.map((v: any) => ({
        label: `${v.name_model} - ${v.vehicle_no}`,
        type: 'radio',
        value: v.vehicle_tbl_id,
        checked: v.v_availability === 'active',
      }));

      const alert = await this.alertController.create({
        header: 'Select Vehicle',
        inputs: inputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm & Accept',
            role: 'confirm',
            handler: (selectedVehicleId) => {
              this.vehicleId = selectedVehicleId;
              console.log('Selected Vehicle ID:', selectedVehicleId);

             
             this.showLoading('Please Wait...');
                this.api.acceptTrip(trip_id,selectedVehicleId).subscribe((res: any) => {
                  this.dismissLoader();
                  this.presentToast(res.msg);
                  if (res.status === 'success') {
                    this.ngOnInit();
                  }else{
                    this.ngOnInit();
                  }
                });
              
            }
          }
        ],
      });

      await alert.present();
    });
  }
  startLocationTracking() {
    this.locationInterval = setInterval(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
      }).catch((error) => {
        console.error('Error getting location:', error);
      });
      
    this.api.AutoLocationTrackingDriver('active',this.longitude,this.latitude).subscribe((res:any)=>{
      console.log(res);
      if(res.status == 'success'){
        this.presentToast('Auto Tracking Location After Every 50 Second..');
        this.cdr.detectChanges();
      }
    })
      
    }, 50000); // 50 seconds
  }
  toggleNotification(event: any) {
    if(this.todayPaymentDue == true)
    {
      this.showLoading("Please Wait..");
      if (event.detail.checked) {
          this.getCurrentLocation();
          this.api.set_driver_availability('active',this.longitude,this.latitude).subscribe((res:any)=>{
            console.log(res);
            this.presentToast(res.msg);
            this.dismissLoader();
            this.cdr.detectChanges();
            this.ngOnInit();

          })
          console.log("Push Notifications Enabled");
      } else {
        this.api.set_driver_availability('closed',this.longitude,this.latitude).subscribe((res:any)=>{
          this.presentToast(res.msg);
          this.dismissLoader();
          this.cdr.detectChanges();
          this.ngOnInit();


        })
          console.log("Push Notifications Disabled");
      }
      this.dismissLoader();
    }else{
      // this.showLoading("Please Wait..");
      // this.dismissLoader();
      this.presentToast("Please Pay Your Today Payment First.");
      event.target.checked = false; // Reset the toggle state
      this.cdr.detectChanges(); // Trigger change detection to update the UI
      this.openPayDueModal();
    }
    this.dismissLoader();


}

async openPayDueModal() {
  const modal = await this.modalCtrl.create({
    component: PayDueTodayComponent,
    cssClass: 'custom-modal-class' // optional for custom style
  });
  return await modal.present();
}

handleRefresh(event: CustomEvent) {
  setTimeout(() => {
    // Any calls to load data go here
    this.ngOnInit();
    (event.target as HTMLIonRefresherElement).complete();
  }, 2000);
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
