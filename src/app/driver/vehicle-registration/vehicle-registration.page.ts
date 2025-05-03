import { Component, OnInit } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController,Platform  } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.page.html',
  styleUrls: ['./vehicle-registration.page.scss'],
  standalone:false
})
export class VehicleRegistrationPage implements OnInit {
  constructor(private api : DriverapiService,private driverApi : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,
    private iab: InAppBrowser,
    private http: HttpClient
  ) { }

  regForm : any = new FormGroup({
    "driver_tbl_id": new FormControl("", [Validators.required]),
    "vehicle_type_tbl_id": new FormControl("", [Validators.required]),
    "name_model": new FormControl("", [Validators.required]),
    "v_reg_date": new FormControl("", [Validators.required]),
    "vehicle_no": new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]{2} [0-9]{2} [A-Z]{2} [0-9]{4}$/)]),
    "Seats": new FormControl("", [Validators.required]),
    "fuel_type": new FormControl("", [Validators.required]),
    "photo": new FormControl("", [Validators.required]),
    "owner_tbl_id": new FormControl("", [Validators.required]),
    "vehicle_brand_id": new FormControl(""),
    "reg_fee": new FormControl("", [Validators.required]),
  });
  vehiclePhoto:any;
  imageUrl:any;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.vehiclePhoto = file; // Store file for upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Display image preview
      };
      reader.readAsDataURL(file);
      console.log(this.vehiclePhoto);
    }
  }
  formatVehicleNo(event: any) {
    let input = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Format: XX NN XX NNNN
    let formatted = '';
    if (input.length > 0) formatted += input.substring(0, 2);
    if (input.length >= 3) formatted += ' ' + input.substring(2, 4);
    if (input.length >= 5) formatted += ' ' + input.substring(4, 6);
    if (input.length >= 7) formatted += ' ' + input.substring(6, 10);

    event.target.value = formatted.trim();
    this.regForm.get('vehicle_no')?.setValue(formatted.trim(), { emitEvent: false });
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

  showBrands : boolean | any;

  vehicle_type : any;
  imgpath:any;
  ngOnInit() {
    this.reg_fee = 0;
   this.showBrands = false;
    this.imgpath = localStorage.getItem('imgpath');
    // this.showLoading("Please Wait...");
    this.api.get_vehicle_types().subscribe((res:any)=>{
      console.log(res);
      this.dismissLoader();
      this.vehicle_type = res.data.vehicle_type;
    })
  }


  payNow(amt:any,vehicle_tbl_id:any)
  {
    this.api.createOrderId(amt).subscribe((res:any)=>{
      console.log(res);
      if (res.status && res.order_id) {
        const redirectUrl = `https://a2zithub.org/deenas_cab/api/checkout?order_id=${res.order_id}&key=${res.key}&amount=${res.amount}&vehicle_tbl_id=${vehicle_tbl_id}&user_token=${localStorage.getItem('token')}`;
        console.log(redirectUrl);
        const browser: InAppBrowserObject = this.iab.create(redirectUrl, '_blank', {
          location: 'no',
          clearcache: 'yes',
          toolbar: 'no'
        });
        
        

        browser.on('loadstop').subscribe((event:any) => {
          if (event.url.includes('success')) {
            this.presentToast('Payment Success!');
            alert('Payment Success!');
            browser.close();
          } else if (event.url.includes('failed')) {
            this.presentToast('Payment Failed!');
            alert('Payment Failed!');
            browser.close();
          }
        });
      }
    });
  

  }
  registerNewVehicle()
  {


   if (this.regForm.valid) {
      this.showLoading("Please Wait..");
      console.log(this.regForm.value);
      this.api.saveVehicleRegistration(this.regForm.value,this.imageUrl).subscribe((res:any)=>{
        console.log("res",res);
        if(res.status=='success')
        {
          this.dismissLoader();
          this.presentToast(res.msg);
          // this.router.navigate(['/driver/home']);
          this.payNow(1,res.vehicle_tbl_id);

        }else{
          this.presentToast(res.msg);
          this.dismissLoader();
        }
      })
    }
    else{
      this.markFormGroupTouched(this.regForm);
    }
  }
  setVehicleBrand(id:any)
  {
    this.regForm.patchValue({
      vehicle_brand_id:id
    })
    console.log(id);
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
  brands:any;
  reg_fee:any;
  getBrands(ev:any,isAval:any,vehicle_type_id:any,regFee:any)
  {
    this.regForm.patchValue({
      reg_fee:regFee,
      driver_tbl_id : localStorage.getItem('token')
    })

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
      this.regForm.patchValue({
        vehicle_brand_id : 'no'
      })
      this.showBrands = false;
    }
    console.log(ev.target.value,isAval,vehicle_type_id,regFee);
  }
}
