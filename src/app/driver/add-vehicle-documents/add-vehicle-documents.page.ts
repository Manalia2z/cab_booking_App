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
  selector: 'app-add-vehicle-documents',
  templateUrl: './add-vehicle-documents.page.html',
  styleUrls: ['./add-vehicle-documents.page.scss'],
  standalone: false

})
export class AddVehicleDocumentsPage implements OnInit {

  constructor(private platform: Platform,private http: HttpClient,private api : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef) {

   }
   imageUrl: string | null = null;
   imageUrl1: string | null = null;
   imageUrl2: string | null = null;
   permit: File | null = null;
   rcDoc: File | null = null;
   Insurance: File | null = null;
   loginForm : any = new FormGroup({
    "vehicle_tbl_id": new FormControl("", [Validators.required]),
    "Insurance_doc": new FormControl("", [Validators.required]),
    "InsuranceExpiry_date": new FormControl("", [Validators.required]),
    "rc_expiry_date": new FormControl("", [Validators.required]),
    "rc_book":  new FormControl("", [Validators.required,]),
    "permit_doc":  new FormControl("", [Validators.required,]),
    "permit_expiry_date":  new FormControl("", [Validators.required,]),
  });
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

accepted_trip :any;
otp:any;
payment_mode:any;
trip_status:any;
list:any;
  ngOnInit() {
    this.activateRoute.params.subscribe((params) => {   
      console.log(params);
      this.api.vehicle_details(params['id']).subscribe((res:any)=>{
        console.log(res);
        this.loginForm.patchValue({
          vehicle_tbl_id: params['id']
        })

        this.list = res.data.list;
      })
    })

   

  }
  uploadVehicleDoc()
  {
    if (this.loginForm.valid) {
      this.showLoading("Please Wait..");
      console.log(this.loginForm.value);
      this.api.uploadVehicleDocuments(this.loginForm.value,this.imageUrl,this.imageUrl1,this.imageUrl2).subscribe((res:any)=>{
        console.log("res",res);
        
        if(res.status == 'success')
        {
          this.presentToast(res.msg);
          this.dismissLoader();
          this.router.navigate(['/driver/vehicle-reg-list']);
        }
        else{
          this.presentToast(res.msg);
          this.dismissLoader();
        }
      })
    }
    else{
      this.markFormGroupTouched(this.loginForm);
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.permit = file; // Store file for upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Display image preview
      };
      reader.readAsDataURL(file);
      console.log(this.permit);
    }
  }

  onFileSelected1(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.rcDoc = file; // Store file for upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl1 = e.target.result; // Display image preview
      };
      reader.readAsDataURL(file);
      console.log(this.rcDoc);
    }
  }
  onFileSelected2(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.Insurance = file; // Store file for upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl2 = e.target.result; // Display image preview
      };
      reader.readAsDataURL(file);
      console.log(this.Insurance);
    }
  }
  onFileSelected3(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.Insurance = file; // Store file for upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl2 = e.target.result; // Display image preview
      };
      reader.readAsDataURL(file);
      console.log(this.Insurance);
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


}
