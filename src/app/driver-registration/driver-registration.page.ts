
import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';
import { DriverapiService } from '../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.page.html',
  styleUrls: ['./driver-registration.page.scss'],
  standalone : false
})
export class DriverRegistrationPage implements OnInit {
  constructor(private api : DriverapiService,private driverApi : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  loginForm : any = new FormGroup({
    "d_name": new FormControl("", [Validators.required]),
    "d_address": new FormControl("", [Validators.required]),
    "d_password": new FormControl("", [Validators.required]),
    "city_tbl_id": new FormControl("", [Validators.required]),
    "d_number":  new FormControl("", 
      [
        Validators.required,
        Validators.pattern('^(\\+91)?[789][0-9]{9}$')
      ]
      ),
    "d_email":  new FormControl("", 
      [
        Validators.required,
      ]
    ),
  });
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
  city :any;
  ngOnInit() {
    this.api.getCity().subscribe((res:any)=>{
      console.log("city",res);
      this.city = res.data;
    })
  }

  registerNewUser()
  {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.showLoading("Please Wait..");
      console.log(this.loginForm.value);
      this.api.driverRegistration(this.loginForm.value).subscribe((res:any)=>{
        console.log("res",res);
        
        if(res.status == 'success')
        {
          localStorage.setItem('token',res.token);
          localStorage.setItem('userType','driver');
          this.presentToast(res.msg);
          this.dismissLoader();
          this.router.navigate(['/driver/driver-document-verify']);
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
