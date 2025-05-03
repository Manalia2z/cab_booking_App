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
  selector: 'app-search-by-stops',
  templateUrl: './search-by-stops.page.html',
  styleUrls: ['./search-by-stops.page.scss'],
  standalone:false
})
export class SearchByStopsPage implements OnInit {

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

   searchStopBy : any;

  ngOnInit() {
    this.payment_mode = 'cash';
    this.shared_mode = 'private';
    this.searchStopBy = "manual";
    this.currentAddress = '';
    this.pickUpDetails = [];
    this.travel_amt_private = 0;
    this.travel_amt_shared = 0;
    this.token = localStorage.getItem('token');

    // this.getCurrentLocation()
    // if(this.longitude == null && this.latitude == null)
    // {
    //   this.getCurrentLocation()
    // }else{
    // }

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

          if(this.pt1_location_by && this.pt2_location_by && this.pt1_location_by != 'manual' || this.pt2_location_by != 'manual'){
            this.getTheExactDistance();
          }
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

    if(type == 'point_one' && location_by == 'manual'){
      this.currentAddress = place.stop_name;
      this.point1 = place.stops_id;
      this.getPlaceDetailsByDet(place,type,location_by);
      this.pt1_location_by = location_by;
    }
    if(type == 'point_one' && location_by == 'auto'){
      this.getPlaceDetailsByDet(place,type,location_by);
      this.currentAddress = place.stop_name;
      this.pt1_location_by = location_by;

    }

    if(type == 'point_two' && location_by == 'manual'){
      this.destination = place.stop_name;
      this.point2 = place.stops_id;
      this.pt2_location_by = location_by;
      this.getPlaceDetailsByDet(place,type,location_by);

    }
    if(type == 'point_two' && location_by == 'auto')
      {
      this.destination = place.stop_name;
      this.pt2_location_by = location_by;
      this.getPlaceDetailsByDet(place,type,location_by);
    }

    console.log("Pickup ID Selected:", this.point1,"Drop ID:", this.point2 , this.pt1_location_by,this.pt2_location_by,"location_by",location_by);
    this.suggestions = [];
       if(this.point1 && this.point2 && this.pt1_location_by == 'manual' && this.pt2_location_by == 'manual')   
    {
      console.log("Pickup ID:", this.point1,"Drop ID:", this.point2);
      this.api.getStopPointsDetails(this.point1,this.point2).subscribe((res:any)=>{
        console.log("Pickup Locations From The Manual Stops:", res);
      
        if(res.status == 'success')
        {
          if(res.data.det.length == 0){
            this.duration = 0;
            this.distance = 0;
            this.travel_amt_private = 0;
            this.travel_amt_shared = 0;
            this.payment_amt = 0;
            this.payment_mode = 'cash';
            this.city_stops_tbl_id = '';
            
            if(this.city_stops_tbl_id == ''){
              this.getTheExactDistance();
              this.presentToast("Cant Book Ride Now, Location For This Stops Are Not Available, Please Select Different Stops");
              this.ngOnInit();
                setTimeout(() => {
                  location.reload();
                }, 4000); // 4 seconds = 4000 milliseconds
              
              return;
            }
          }else{
            this.duration = res.data.det[0].duration;
            this.distance = res.data.det[0].distance;
            const fare = this.calculateFareDetails(this.distance); // or this.calculateFareDetails(918 / 1000);
            console.log(fare.normal_fare);    // Normal hours fare
            console.log(fare.midnight_fare);  // Midnight adjusted fare
            this.travel_amt_shared = res.data.det[0].travel_amt_shared;
            // Determine current time
            
              const now = new Date();
              const hour = now.getHours();
              const minute = now.getMinutes();
              const totalMinutes = hour * 60 + minute;

              // 05:00 AM = 300 mins | 11:00 PM = 1380 mins
              if (totalMinutes >= 300 && totalMinutes < 1380) {
                // Morning 5 AM to 10:59 PM — normal fare
                this.travel_amt_private = fare.normal_fare;
                console.log("Applied: Normal Fare");
              } else {
                // Night 11 PM to 4:59 AM — midnight fare
                this.travel_amt_private = fare.midnight_fare;
                console.log("Applied: Midnight Fare");
              }
            this.payment_amt = this.travel_amt_private;
            this.payment_mode = 'cash';
            this.city_stops_tbl_id = res.data.det[0].city_stops_tbl_id;
          }
        }
        else{
          this.travel_amt_private = 0;
          this.travel_amt_shared = 0;
          this.pt2_location_by = 'auto';
          this.distance = res.data.distance_text;
          const fare = this.calculateFareDetails(res.data.distance); // or this.calculateFareDetails(918 / 1000);
          console.log(fare.normal_fare);    // Normal hours fare
          console.log(fare.midnight_fare);  // Midnight adjusted fare
          // Determine current time
          
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const totalMinutes = hour * 60 + minute;

            // 05:00 AM = 300 mins | 11:00 PM = 1380 mins
            if (totalMinutes >= 300 && totalMinutes < 1380) {
              // Morning 5 AM to 10:59 PM — normal fare
              this.travel_amt_private = fare.normal_fare;
              this.payment_amt = fare.normal_fare;
              console.log("Applied: Normal Fare");
            } else {
              // Night 11 PM to 4:59 AM — midnight fare
              this.travel_amt_private = fare.midnight_fare;
              this.payment_amt = fare.midnight_fare;
              console.log("Applied: Midnight Fare");
            }

        }
      })
    }

}
isValidAmount(val: any): boolean {
  return !Number.isNaN(val) && val !== 0;
}
  // selectPlace(place: any,type:any,location_by:any) {
  //   console.log("Selected location_by:", location_by);
  //   if(this.searchStopBy == 'auto' || location_by == 'auto'){
  //   const formData = new FormData();
  //   formData.append("place_id", place.place_id);
  //   this.getPlaceDetailsByDet(place,type);

  // }else{
  //   if(type == 'point_one' && location_by == 'manual'){
  //     this.currentAddress = place.stop_name;
  //     this.point1 = place.stops_id;
  //     this.getPlaceDetailsByDet(place,type);
  //     this.pt1_location_by = location_by;
  //   }else{
  //     this.getPlaceDetailsByDet(place,type);
  //   }

  //   if(type == 'point_two' && location_by == 'manual'){
  //     this.destination = place.stop_name;
  //     this.point2 = place.stops_id;
  //     this.getPlaceDetailsByDet(place,type);
  //     this.pt2_location_by = location_by;

  //   }
  //   console.log("Pickup ID Selected:", this.point1,"Drop ID:", this.point2 , this.pt1_location_by,this.pt2_location_by);


  // }

  // console.log("Selected Place:", place,type);
    
  //   this.suggestions = []; // Clear suggestions after selection
  //   if(this.point1 && this.point2)
  //   {
  //     console.log("Pickup ID:", this.point1,"Drop ID:", this.point2);
  //     this.api.getStopPointsDetails(this.point1,this.point2).subscribe((res:any)=>{
  //       console.log("Pickup Locations:", res);
  //       if(res.status == 'success')
  //       {
  //         this.duration = res.data.det[0].duration;
  //         this.distance = res.data.det[0].distance;
  //         this.travel_amt_private = res.data.det[0].travel_amt_private;
  //         this.travel_amt_shared = res.data.det[0].travel_amt_shared;
  //         this.payment_amt = res.data.det[0].travel_amt_private;
  //         this.payment_mode = 'cash';
  //         this.city_stops_tbl_id = res.data.det[0].city_stops_tbl_id;
  //       }
  //       else{
         
  //       }
  //     })
  //   }
  // }
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
        this.api.calculatefareDistance(25,this.duration,this.distance).subscribe((res:any)=>{
          console.log("fare Details",res);
          const fare = this.calculateFareDetails(this.distance); // or this.calculateFareDetails(918 / 1000);
          console.log("fare.normal_fare",fare.normal_fare);    // Normal hours fare
          console.log("fare.midnight_fare",fare.midnight_fare);  // Midnight adjusted fare
          // Determine current time
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const totalMinutes = hour * 60 + minute;

            // 05:00 AM = 300 mins | 11:00 PM = 1380 mins
            if (totalMinutes >= 300 && totalMinutes < 1380) {
              // Morning 5 AM to 10:59 PM — normal fare
              this.payment_amt = fare.normal_fare;
              console.log("Applied: Normal Fare");
            } else {
              // Night 11 PM to 4:59 AM — midnight fare
              this.payment_amt = fare.midnight_fare;
              console.log("Applied: Midnight Fare");
            }
          this.fare_det = res.fare;
        })
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

  
    this.api.getStops(stop.target.value).subscribe((res:any)=>{
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

  bookTrip()
  {
    if(this.searchStopBy == 'manual')
    {
      this.bookTripManually();
      console.log("Saved Manually");
    }
    else{
      console.log("Saved Automatically");
      this.bookTrip_auto();
    }
  }
  bookTripManually()
  {
    if(this.point1 == '' || this.point2 == '')
      {
        this.presentToast("Please Select Pickup and Drop Location");
        return;
      }else if(this.point1 == this.point2)
      {
        this.presentToast("Pickup and Drop Location Should be Different");
        return;
      }
      else if(this.payment_amt ==0)
      {
        this.presentToast("Cant Book Ride Now Location For This Stops Are Not Available");
        return;
      }
      else{
      console.log("--",this.point1);
      console.log("--",this.point2);
      console.log("payment_amt --",this.payment_amt);
      console.log("--",this.payment_mode,this.city_stops_tbl_id);
        this.api.saveTripManually(this.point1,this.point2,this.payment_amt,this.payment_mode,this.city_stops_tbl_id,this.distance,this.duration,this.shared_mode).subscribe((res:any)=>{
          console.log("Response:", res);
          this.presentToast(res.msg);
          this.router.navigate(['user/my-rides']);
        })
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
   
}
