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
@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.page.html',
  styleUrls: ['./search-location.page.scss'],
  standalone:false
})
export class SearchLocationPage implements OnInit {
  searchSubject = new Subject<{ input: string; type: string }>();
  apiKey = 'AIzaSyAwKWas56c5rN9C-ugui7WQvvSEPq_RH04';  // Replace with your Google API Key
  pickupLocation: string = '';
  destination: string = '';
  suggestions: any[] = [];
  imgpath:any;

  pickUpCity : any;
  pickUpAddress : any;
  pickUplatitude : any;
  pickUplongitude : any;
  pickUpPostalCode :any;
  pickUpState : any;
  isPickUpLocationFound : any;
  token:any;

  dropCity : any;
  dropAddress : any;
  droplatitude : any;
  droplongitude : any;
  dropPostalCode :any;
  dropState : any;
  dropLocation: any;
  isDropLocationFound : any;

  constructor(private platform: Platform,private http: HttpClient,private api : UserapiService,
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
   vehicle_type:any;
   payment_amt:any;
   tripForm : any = new FormGroup({
    "vehicle_type_id": new FormControl("", [Validators.required]),
    "pickupLocation": new FormControl("", [Validators.required]),
    "destination": new FormControl("", [Validators.required]),
    "vehicle_brand_id": new FormControl("", [Validators.required]),
    "payment_amt": new FormControl("", [Validators.required]),
  });

  ngOnInit() {
    this.payment_amt=0;
    this.token = localStorage.getItem('token');
    this.imgpath = localStorage.getItem('imgpath');
    this.api.get_vehicle_types().subscribe((res:any)=>{
      console.log(res);
      this.vehicle_type = res.data.vehicle_type;
    })
    this.isPickUpLocationFound = 'no';
    this.isDropLocationFound = 'no';
  }
  
  searchType:any;
  loader : any;
  
  onSearchChange(event: any, type: string) {
    if(type == "pickup")
    {
      this.isPickUpLocationFound = 'no';
      this.pickupLocation = event.target.value;
    }
    if(type == "destination")
    {
      this.isDropLocationFound = 'no';
      this.destination = event.target.value;
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
  //   onSearchChange(event: any, type: string) {
  //   const input = event.target.value;
  //   if (input.length > 2) {
  //     this.searchSubject.next({ input, type }); // Emit value to Subject
  //   } else {
  //     this.suggestions = [];
  //   }
  // }
  getGooglePlaces() {
    this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?...')
      .subscribe(response => {
        console.log(response);
      });
  }
  getPlaceSuggestions(input: string) {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${this.apiKey}&types=geocode`;
  
    this.http.get(url).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  brands:any;
  reg_fee:any;
  showBrands:any;
  getBrands(ev:any,isAval:any,vehicle_type_id:any,regFee:any)
  {
    this.tripForm.patchValue({
      vehicle_brand_id : ''
    })
    this.payment_amt=0;
    if(isAval == 'yes')
    {
      this.reg_fee = regFee;
      this.showLoading("Please Wait, Fetching Brands for You.");
      this.api.getVehicleBrands(vehicle_type_id).subscribe((res:any)=>{
        console.log(res);
        this.brands = res.data;
        this.dismissLoader();
      })
      this.showBrands = true;
    }
    else{
      this.tripForm.patchValue({
        vehicle_brand_id : 'no'
      })
      this.showBrands = false;
    }
    console.log(ev.target.value,isAval,vehicle_type_id,regFee);
  }
  getAmount(ev:any,brandId:any)
  {
    this.api.calculatefareDistance(brandId,this.duration,this.distance).subscribe((res:any)=>{
      console.log(res);
      this.payment_amt = res.total_pay_to_cust
      this.tripForm.patchValue({
        "payment_amt":this.payment_amt
      })
    })
    console.log(brandId,this.duration,this.distance);
  }
  selectPlace(place: any,type:any) {
    const formData = new FormData();
    formData.append("place_id", place.place_id);

    this.api.GetPlaceDetails(place.place_id).subscribe(
      (res: any) => {
        console.log("Place Details:", res);
        if (res.status === "success") 
          {
          if(type == 'pickup'){
            this.pickupLocation = res.details.address;
            this.pickUpCity = res.details.city; 
            this.pickUpAddress = res.details.address; 
            this.pickUplatitude = res.details.latitude; 
            this.pickUplongitude = res.details.longitude; 
            this.pickUpPostalCode = res.details.postal_code;
            this.pickUpState = res.details.state; 
            this.isPickUpLocationFound = 'yes';
          }
          if(type == 'destination'){
            this.destination = res.details.address;
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

    this.suggestions = []; // Clear suggestions after selection
  }
  AllLocationData = [];
  distance :any;
  duration:any;
  getTheExactDistance()
  {
    this.api.getDistanceCalculation(this.pickupLocation,this.pickUpCity,this.pickUpAddress,this.pickUplatitude,this.pickUplongitude,this.pickUpPostalCode,this.pickUpState,this.destination,this.dropLocation,this.dropCity,this.dropAddress,this.droplatitude,this.droplongitude,this.dropPostalCode,this.dropState).subscribe((res:any)=>{
      console.log("getTheExactDistance",res);
      this.distance = res.distance;
      this.duration = res.duration;
    })
  }
  getCurrentLocation()
  {

  }

  bookTrip()
  {
    if (this.tripForm.valid) {
      this.showLoading("Please Wait..");
      console.log(this.tripForm.value);
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
        }
      ];
      console.log(locations);
      this.api.bookTrip(this.tripForm.value,locations,this.token).subscribe((res:any)=>{
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
    else{
      this.markFormGroupTouched(this.tripForm);
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
