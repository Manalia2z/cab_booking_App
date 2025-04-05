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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone:false
})
export class EditProfilePage implements OnInit {

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

    editForm : any = new FormGroup({
    "d_name": new FormControl("", [Validators.required]),
    "d_email": new FormControl("", [Validators.required]),
    "d_address": new FormControl("", [Validators.required]),
    "d_password": new FormControl("", [Validators.required]),

  });

  ngOnInit() {
    this.api.driver_profile().subscribe((res:any)=>{
      console.log(res);
      this.editForm.patchValue({
      d_name:res.data.driver_info[0].d_name,
      d_email:res.data.driver_info[0].d_email,
      d_address:res.data.driver_info[0].d_address,
      d_password:res.data.driver_info[0].d_password,
    })
  });
}
UpdateDriver()
{
  console.log(this.editForm.value);
  if(this.editForm.valid){
    this.showLoading("Please Wait ....");
    this.api.updateDriverDet(this.editForm.value).subscribe((res:any)=>{
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
  }else{
    this.markFormGroupTouched(this.editForm);
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
