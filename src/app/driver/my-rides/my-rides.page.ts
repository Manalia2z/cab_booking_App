import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.page.html',
  styleUrls: ['./my-rides.page.scss'],
  standalone:false
})
export class MyRidesPage implements OnInit {


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
  activeTab:any;
  tab_id:number = 1;
  noActiveTrip:boolean = false;
  ngOnInit() {
    this.tab_id = 1;
    this.activeTab = 'accepted';
    this.imgpath = localStorage.getItem('imgpath');
    this.api.acceptedTrips().subscribe((res:any)=>{
      console.log(res);
      if(res.status == 'success')
      {
        console.log("-------------",res);
        console.log(res); 
        this.trip_list = res.data;
        this.noActiveTrip = false;
      }
      else{
        this.trip_list = [];
        this.noActiveTrip = true;
      }
    })
    
  }
  openRideDetails(trip_id:any)
  {
    this.router.navigate(['/driver/active-ride-det/'+trip_id]);
  }
  
  getRideList(status:any,tab_id:any){
    this.tab_id = tab_id;
    this.activeTab = status;
    if(status == 'accepted')
  {
        this.ngOnInit();
  }
  else
  {
    this.api.TripListByDriver(status).subscribe((res:any)=>{
      if(res.status == 'success')
      {
        this.trip_list = res.data;
        console.log("trip_list",status,this.trip_list);
        this.cdr.detectChanges(); 
        this.noActiveTrip = false;

      }else{
        this.trip_list = [];
        this.noActiveTrip = true;
       
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
