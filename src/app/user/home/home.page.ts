declare var google: any; // Declare google to avoid TS errors

import { Component, OnInit,ElementRef, ViewChild  } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
import * as L from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {
  @ViewChild('mapRef', { static: false }) mapRef!: ElementRef;
  map: any;

  currentMarker: any;
 
  constructor(private api : UserapiService,private driverApi : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private geolocation: Geolocation
  ) { }
det:any;
tripAval:any;
trip_list:any;
noActiveTrip:any;
  ngOnInit() {
    this.tripAval = true;
    // this.loadMap();
    this.api.userTripList().subscribe((res:any)=>{
      console.log("userTripList",res);
      
      if(res.status == 'success')
      {
        this.trip_list = res.data.trip;
        this.noActiveTrip = false;
        this.getUserTrip();

      }else{
        this.noActiveTrip = true;
        this.trip_list = [];
        this.loadMap();
      }
    })

    localStorage.setItem('userType','user');
    this.api.getUserDetails().subscribe((res:any)=>{
      this.det=res.data.det;
      console.log(res);
    })
    if (!localStorage.getItem('firstLoadDone')) {
      localStorage.setItem('firstLoadDone', 'true');
      location.reload(); // Refresh the page
    }
  }
  getUserTrip() {
    this.api.userTripList().subscribe((res: any) => {
      if (res.status === 'success' && res.data.trip.length > 0) {
        const trip = res.data.trip[0];
        const pickup = {
          lat: parseFloat(trip.pickUplatitude),
          lng: parseFloat(trip.pickUplongitude),
        };
        const drop = {
          lat: parseFloat(trip.droplatitude),
          lng: parseFloat(trip.droplongitude),
        };
        this.initMap(pickup, drop);
      }
    });
  }
  initMap(pickup: any, drop: any) {
    const mapOptions = {
      center: pickup,
      zoom: 14,
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsRenderer.setMap(this.map);

    directionsService.route(
      {
        origin: pickup,
        destination: drop,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);

          // Add advanced markers (optional)
          new google.maps.marker.AdvancedMarkerElement({
            map: this.map,
            position: pickup,
            title: 'Pickup',
          });

          new google.maps.marker.AdvancedMarkerElement({
            map: this.map,
            position: drop,
            title: 'Drop',
          });
        }
      }
    );
  }
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      this.ngOnInit();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
ionViewWillEnter() {
    this.ngOnInit();
  }
  cancelTrip(tripId:any)
  {
    console.log(tripId);
    if(confirm("Are you sure you want to cancel the trip?"))
    { 
      this.api.cancelTrip(tripId).subscribe((res:any)=>{
        console.log(res);
        if(res.status=='success')
        {
          this.presentToast(res.msg);
          this.ngOnInit();
        }else{
          this.presentToast(res.msg);
        }
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
  openRideDetails(trip_id:any)
  {
    this.router.navigate(['/user/active-ride-det/'+trip_id]);
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

      // Animate the zoom-in
      setTimeout(() => {
        this.map.setZoom(18);

        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          animation: google.maps.Animation.DROP // Drop animation
        });

        // Optional: make it bounce once
        setTimeout(() => marker.setAnimation(google.maps.Animation.BOUNCE), 1500);
        setTimeout(() => marker.setAnimation(null), 3000);

      }, 1000);
    });
  }  

  // ionViewDidEnter(): void {
  //   this.loadMap();
  // }

  // loadMap() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     const lat = resp.coords.latitude;
  //     const lng = resp.coords.longitude;

  //     setTimeout(() => {
  //       this.map = L.map('map').setView([lat, lng], 15);

  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         attribution: '© OpenStreetMap contributors'
  //       }).addTo(this.map);

  //       L.marker([lat, lng])
  //         .addTo(this.map)
  //         .bindPopup('📍 You are here')
  //         .openPopup();
  //     }, 100); // ensure DOM is ready
  //   }).catch(err => {
  //     console.error('Geolocation error', err);
  //   });
  // }
  SearchLocation()
  {
    this.router.navigate(['/user/search-by-stops']);
  }
}
