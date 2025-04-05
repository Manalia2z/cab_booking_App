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
  selector: 'app-driver-bank-details',
  templateUrl: './driver-bank-details.page.html',
  styleUrls: ['./driver-bank-details.page.scss'],
  standalone:false
})
export class DriverBankDetailsPage implements OnInit {

 constructor(private platform: Platform,private http: HttpClient,private api : DriverapiService,
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

    bankDetailsForm : any = new FormGroup({
    "bank_name": new FormControl("", [Validators.required]),
    "bank_acc_holder_name": new FormControl("", [Validators.required]),
    "bank_account_no": new FormControl("", [Validators.required]),
    "branch_name": new FormControl("", [Validators.required]),
    "bank_ifsc_code": new FormControl("", [Validators.required]),

  });

  ngOnInit() {
  }
 savebank()
  {
    console.log(this.bankDetailsForm.value);
    if (this.bankDetailsForm.valid) {
      this.showLoading("Please wait your bank details is saving");
     this.api.saveDriverBankDet(this.bankDetailsForm.value).subscribe((res:any)=>{
      this.dismissLoader();
      
      if(res.status=='success'){
        this.dismissLoader();
        this.presentToast(res.msg);
      }
      else{
        this.dismissLoader();
        this.presentToast(res.msg);
      }
     })
    }
    else{
      this.markFormGroupTouched(this.bankDetailsForm);
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
