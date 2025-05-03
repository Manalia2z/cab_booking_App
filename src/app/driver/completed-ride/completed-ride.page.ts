import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-completed-ride',
  templateUrl: './completed-ride.page.html',
  styleUrls: ['./completed-ride.page.scss'],
  standalone: false
})
export class CompletedRidePage implements OnInit {


  constructor(private api:DriverapiService,private geolocation: Geolocation,    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController) { }
  aval_status:any;
  latitude: number | null = null;
  longitude: number | null = null;
  ttlPendingTrips:any;
  ttlCompletedTrips:any;
  ttlCancelTrips:any;
  ttl_schedule_trip:any;
  trip_list:any;
  imgpath:any ;
  private loading: HTMLIonLoadingElement | null = null;
  ngOnInit() {
   

    this.imgpath = localStorage.getItem('imgpath');
    const status = 'completed';
    this.api.TripListByDriver(status).subscribe((res:any)=>{
      if(res.status == 'success')
      {
        this.trip_list = res.data;
        console.log("trip_list",status,this.trip_list);

      }
    })
    
  }
  ionViewWillEnter() {
    this.ngOnInit();
    const status = 'completed';
    this.api.TripListByDriver(status).subscribe((res:any)=>{
      if(res.status == 'success')
      {
        this.trip_list = res.data;
        console.log("trip_list",status,this.trip_list);

      }
    })
  }
  openRideDetails(trip_id:any)
  {
    this.router.navigate(['/driver/active-ride-det/'+trip_id]);
  }
  getRideList(status:any){
  if(status == 'accepted')
  {
    this.ngOnInit();
    alert("You have already accepted this trip.");
  }else{
    this.api.TripListByDriver(status).subscribe((res:any)=>{
      if(res.status == 'success')
      {
        this.trip_list = res.data;
        console.log("trip_list",status,this.trip_list);
        this.cdr.detectChanges(); 

      }else{
       
      }
    })
  }
  }
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      this.ngOnInit();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
}
