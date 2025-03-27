import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';
import { DriverapiService } from '../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.page.html',
  styleUrls: ['./user-registration.page.scss'],
  standalone : false
})
export class UserRegistrationPage implements OnInit {

  constructor(private userApi : UserapiService,private driverApi : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  loginForm : any = new FormGroup({
    "u_name": new FormControl("", [Validators.required]),
    "u_number":  new FormControl("", 
      [
        Validators.required,
        Validators.pattern('^(\\+91)?[789][0-9]{9}$')
      ]
      ),
    "u_email":  new FormControl("", 
      [
        Validators.required,
      ]
    ),
  });
  loader : any;
  ngOnInit() {

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
  registerNewUser()
  {
    if (this.loginForm.valid) {
      this.showLoading("Please Wait..");
      console.log(this.loginForm.value);
      this.userApi.userRegistration(this.loginForm.value).subscribe((res:any)=>{
        console.log("res",res);
        if(res.status == 'success')
        {
          localStorage.setItem('token',res.token);
          localStorage.setItem('userType','user');
          this.presentToast(res.msg);
          this.dismissLoader();
          this.router.navigate(['/user/home']);
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
