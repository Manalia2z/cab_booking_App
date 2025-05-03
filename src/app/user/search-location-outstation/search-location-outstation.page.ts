import { Component, OnInit } from '@angular/core';
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
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
@Component({
  selector: 'app-search-location-outstation',
  templateUrl: './search-location-outstation.page.html',
  styleUrls: ['./search-location-outstation.page.scss'],
  standalone:false
})
export class SearchLocationOutstationPage implements OnInit {

  constructor(private geolocation: Geolocation,private platform: Platform,private http: HttpClient,private api : UserapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        console.log('Cordova is available');
        // Use Cordova plugins here
      } else {
        console.log('Cordova not available, using web fallback');
      }
    });
   }
   searchType:any;
   loader : any;
   latitude: number | null = null;
   longitude: number | null = null;
   currentAddress :any;
   currentPincode :any;
   currentCity : any;
   destination: string = '';
   suggestions: any[] = [];
   payment_amt:any;
   payment_mode:any;  
   shared_mode:any;
   fare_det : any;


   dropLocation:any;
   dropCity:any;
   dropAddress:any;
   droplatitude:any;
   droplongitude:any;
   dropPostalCode:any;
   dropState:any;
   isDropLocationFound:any;
   duration:any;
   distance:any;
   pickUpDetails : any;
   dropDetails : any;

   point1:any;
   point2:any;
   travel_amt_private:any;
   travel_amt_shared:any;

   pickUpCity : any;
   pickUpAddress : any;
   pickUplatitude : any;
   pickUplongitude : any;
   pickUpPostalCode :any;
   pickUpState : any;
   isPickUpLocationFound : any;
   token:any;
   pickupLocation:any;
   brandsList:any;
   searchStopBy : any;
   cabForm:any;

  ngOnInit() {
    this.cabForm = this.fb.group({
      currentLocation: ['', Validators.required],  // Current Location
      destination: ['', Validators.required],      // Destination
      pickupDate: ['', Validators.required],       // Pickup Date
      // pickupTime: ['', Validators.required],       // Pickup Time
      returnTrip: ['yes', Validators.required],       // Return Trip (Yes/No)
      returnDate: [''],                            // Return Date
      returnTime: [''],                            // Return Time
      cabType: ['', Validators.required],          // Cab Type (e.g., Sedan, SUV)
      numberOfPassengers: [1, [Validators.required, Validators.min(1)]], // Number of passengers
      paymentMode: ['', Validators.required],      // Payment Mode
      vehicle_brand_id: ['', Validators.required],      // Payment Mode
      duration: ['', Validators.required],      // Payment Mode
      distance: ['', Validators.required],      // Payment Mode
      payment_amt:['',Validators.required],
      description:[''],
      no_of_passaengers:['',Validators.required],
      no_of_luggage:['',Validators.required],
    });
    
    this.payment_mode = 'cash';
    this.shared_mode = 'private';
    this.searchStopBy = "manual";
    this.currentAddress = '';
    this.pickUpDetails = [];
    this.travel_amt_private = 0;
    this.travel_amt_shared = 0;
    this.token = localStorage.getItem('token');

    this.api.vehicle_brand_list().subscribe((res:any)=>{
      console.log("vehicle_brand_list ",res);
      this.brandsList = res.data;
    })

  }
  ChangeReturn(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log('Return Trip checked:', isChecked);
  
    if (isChecked) {
     console.log("checked");
     this.cabForm.patchValue({
      returnTrip : 'yes'
     });
    } else {
      this.cabForm.patchValue({
        returnTrip : 'no'
       });
      console.log("Un checked");
    }
  
  }
  
  onSearchChange(event: any, type: string) {

    if(type == "point_two")
    {
      this.point2 = '';
      this.destination = event.target.value;
    }
    if(type == "point_one")
    {
      this.point1 = '';
      this.currentAddress = event.target.value;
    }   
    this.searchType = type;
    const input = event.target.value;
    if (input.length > 2 && input.length%2==0) {
      this.api.SearchLocation(input,type).subscribe((res:any)=>{
       
        console.log("Response:", res);
          if (res.status === "success") {
            this.suggestions = res.locations;
          }
      })
    } else {
      this.suggestions = [];
    }
  }
  city_stops_tbl_id:any;
  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
      this.api.GetLocationByLatLng(this.latitude,this.longitude).subscribe((res:any)=>{
        console.log("hhkjh",res);
        if(res.status == 'success'){
          this.currentAddress = res.address;
          this.currentPincode = res.pincode;
          this.currentCity = res.city;
          this.api.GetNearestStop(this.latitude,this.longitude).subscribe((res_pickups:any)=>{
            console.log("Pickup Locations:", res_pickups);
          })
        }
      })
    }).catch((error) => {
      console.error('Error getting location:', error);
    });
  }
  getAmount(ev:any,brandId:any)
  {
    this.api.calculatefareDistance(25,this.duration,this.distance).subscribe((res:any)=>{
      console.log("fare Details",res);
      this.payment_amt = res.total_pay_to_cust;
      this.fare_det = res.fare;
     
    })
    console.log(brandId,this.duration,this.distance);
  }
  location_by:any;
  getPlaceDetailsByDet(place:any,type:any,location_by:any) {
  {
    this.api.GetPlaceDetails(place.place_id).subscribe(
      (res: any) => {
        console.log("Place Details:", res,type);
        if (res.status === "success") 
          {
          if(type == 'point_one'){
            this.pickupLocation = res.details.address;
            this.currentAddress = res.details.address;
            if(location_by == 'auto'){
              this.point1 = res.details.address;
            }
            this.pickUpCity = res.details.city; 
            this.pickUpAddress = res.details.address; 
            this.pickUplatitude = res.details.latitude; 
            this.pickUplongitude = res.details.longitude; 
            this.pickUpPostalCode = res.details.postal_code;
            this.pickUpState = res.details.state; 
            this.isPickUpLocationFound = 'yes';
          }
          if(type == 'point_two'){
            this.destination = res.details.address;
            if(location_by == 'auto'){
              this.point2 = res.details.address;
            }
            this.dropLocation = res.details.address;
            this.dropCity = res.details.city; 
            this.dropAddress = res.details.address; 
            this.droplatitude = res.details.latitude; 
            this.droplongitude = res.details.longitude; 
            this.dropPostalCode = res.details.postal_code;
            this.dropState = res.details.state; 
            this.isDropLocationFound = 'yes';
          }

         this.getTheExactDistance();
          
          console.log("Latitude:", res.details.latitude);
          console.log("Longitude:", res.details.longitude);
          console.log("City:", res.details.city);
          console.log("Postal Code:", res.details.postal_code);
        }
      },
      (error: any) => {
        console.error("Error fetching place details:", error);
      }
    );
    this.suggestions = [];
  }
}
pt1_location_by:any;
pt2_location_by:any;
selectPlace(place: any,type:any,location_by:any) {
  console.log("Selected Type:", type,"location_by:", location_by);

    if(type == 'point_one'){
      this.currentAddress = place.stop_name;
      this.point1 = place.stops_id;
      this.getPlaceDetailsByDet(place,type,location_by);
      this.pt1_location_by = location_by;
    }

    if(type == 'point_two'){
      this.destination = place.stop_name;
      this.point2 = place.stops_id;
      this.pt2_location_by = location_by;
      this.getPlaceDetailsByDet(place,type,location_by);

    }


    console.log("Pickup ID Selected:", this.point1,"Drop ID:", this.point2 , this.pt1_location_by,this.pt2_location_by,"location_by",location_by);
    this.suggestions = [];


}
isValidAmount(val: any): boolean {
  return !Number.isNaN(val) && val !== 0;
}

  getPaymentMode(event:any)
  {
    console.log("Payment Mode:", event);
    this.payment_mode = event; 
  }
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      this.ngOnInit();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
  getSharedMode(event:any,amt:any)
  {
    console.log("Payment Mode:", event,amt);
    // this.getSharedMode = event; 
    this.shared_mode = event;
    this.payment_amt =amt;
  }
  AllLocationData = [];
  getTheExactDistance()
  {
    this.api.getDistanceCalculation(this.pickupLocation,this.pickUpCity,this.pickUpAddress,this.pickUplatitude,this.pickUplongitude,this.pickUpPostalCode,this.pickUpState,this.destination,this.dropLocation,this.dropCity,this.dropAddress,this.droplatitude,this.droplongitude,this.dropPostalCode,this.dropState).subscribe((res:any)=>{
      console.log("getTheExactDistance",res);
      this.distance = res.distance;
      this.duration = res.duration;
    })
  }

  calculateFareByVehicleType(id:any)
  {
    this.api.calculatefareDistance(id.target.value,this.duration,this.distance).subscribe((res:any)=>{
      console.log("fare Details",res);
      this.payment_amt=res.total_pay_to_cust;
      this.fare_det = res.fare;
    })
  }
  getStop(stop:any,point:any)
  {
    this.searchType = point;
    if(this.searchType == 'point_one' && stop.target.value.length < 2 ){
      this.point1 = '';
    }
    
    if(this.searchType == 'point_two' && stop.target.value.length < 2 ){
      this.point2 = '';
    }

  
    this.api.getOutstationStops(stop.target.value).subscribe((res:any)=>{
      console.log("Pickup Locations:", res);
      if(res.status == 'success')
      {
        this.suggestions = res.data;
        this.searchStopBy = 'manual';
      }
      else{
        // this.presentToast(res.msg);
        // search Location Using G Map API
        this.searchStopBy = 'auto';
        this.getLocationByGmap(stop.target.value,point);
      }
    })
  
    console.log("Stop:", stop.target.value);
    console.log("Point:", point,"searchStopBy:", this.searchStopBy);
  }
  calculateFareDetails(km: number | string, timestamp: number | null = null): { normal_fare: number, midnight_fare: number } {
    const baseDistance = 1.5;
    const baseFare = 23;
    const perKmRate = 15.33;
  
    // Ensure km is a valid number
    const distance = parseFloat(km as string);
    if (isNaN(distance)) {
      return { normal_fare: NaN, midnight_fare: NaN };
    }
  
    // Default to current timestamp if not provided
    const time = timestamp ? new Date(timestamp) : new Date();
  
    const hour = time.getHours();
    const minute = time.getMinutes();
    const totalMinutes = hour * 60 + minute;
  
    // Calculate normal fare
    let normalFare: number;
    if (distance <= baseDistance) {
      normalFare = baseFare;
    } else {
      const extraKm = distance - baseDistance;
      const extraFare = Math.round(extraKm * perKmRate);
      normalFare = baseFare + extraFare;
    }
  
    // Midnight check (00:00 to 04:59)
    const isMidnight = totalMinutes >= 0 && totalMinutes < 300;
    const midnightFare = !isMidnight ? Math.round(normalFare * 1.25) : normalFare;
  
    return {
      normal_fare: normalFare,
      midnight_fare: midnightFare
    };
  }
  
  getLocationByGmap(event: any, type: string) {
    if(type == "point_one")
    {
      this.isPickUpLocationFound = 'no';
    }
    if(type == "point_two")
    {
      this.isDropLocationFound = 'no';
    }

    this.searchType = type;
    const input = event;
    if (input.length > 2 && input.length%2==0) {
      this.api.SearchLocation(input,type).subscribe((res:any)=>{
       
        console.log("Response:", res);
          if (res.status === "success") {
            this.suggestions = res.locations;
          }
      })
    } else {
      this.suggestions = [];
    }
  }

  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
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

  bookRide()
  {
    if(this.cabForm.valid) {
      console.log(this.cabForm.value);
    }else{
      this.markFormGroupTouched(this.cabForm);
    }
  }

  bookTrip_auto()
  {
      const locations = [
        { 
          isPickUpLocationFound: this.isPickUpLocationFound,
          isDropLocationFound: this.isDropLocationFound ,
          pickupLocation : this.pickupLocation,
          pickUpCity : this.pickUpCity,
          pickUpAddress : this.pickUpAddress,
          pickUplatitude : this.pickUplatitude,
          pickUplongitude : this.pickUplongitude,
          pickUpPostalCode : this.pickUpPostalCode,
          pickUpState : this.pickUpState,
          destination : this.destination,
          dropLocation : this.dropLocation,
          dropCity : this.dropCity,
          dropAddress : this.dropAddress,
          droplatitude : this.droplatitude,
          droplongitude : this.droplongitude,
          dropPostalCode : this.dropPostalCode,
          dropState : this.dropState,
          distance : this.distance,
          duration : this.duration,
          payment_amt : this.payment_amt,
          payment_mode : this.payment_mode,
          shared_mode : this.shared_mode,
        }
      ];
      console.log(locations);
      if(this.point1 == '' || this.point2 == '')
        {
          this.presentToast("Please Select Pickup and Drop Location");
          return;
        }else if(this.point1 == this.point2)
        {
          this.presentToast("Pickup and Drop Location Should be Different");
          return;
        }
        else if(this.payment_amt == 0)
        {
          this.presentToast("Cant Book Ride Now Location For This Stops Are Not Available");
          return;
        }
        else{
          this.api.book_Trip(locations,this.token,this.fare_det).subscribe((res:any)=>{
            console.log("res",res);
            if(res.status == 'success')
            {
              this.presentToast(res.msg);
              this.dismissLoader();
              this.router.navigate(['user/my-rides']);
            }
            else{
              this.presentToast(res.msg);
              this.dismissLoader();
            }
          })
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
}