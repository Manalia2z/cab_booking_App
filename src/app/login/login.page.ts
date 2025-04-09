import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';
import { DriverapiService } from '../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone : false
})
export class LoginPage implements OnInit {

  constructor(private userApi : UserapiService,private driverApi : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }
  ngOnInit() {
     const userType = localStorage.getItem('userType');
     const token = localStorage.getItem('token');
      if(userType == 'user' && token)
      {
        this.router.navigate(['/user/home']);
      }

      if(userType == 'driver' && token)
      {
          this.router.navigate(['/driver/home']);
      }

  }
  loginForm : any = new FormGroup({
    "email": new FormControl("", [Validators.required,Validators.email ]),
    "password":  new FormControl("", 
      [
        Validators.required,
      ]
      ),
  });
  loader : any;
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
  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  loginUser()
  {
    if (this.loginForm.valid) {
      this.showLoading("Please Wait..");
      console.log(this.loginForm.value);
      this.userApi.login(this.loginForm.value).subscribe((res:any)=>{
        console.log("res",res);
        
        if(res.status == 'success' && res.userType == 'user')
        {
          localStorage.setItem('token',res.user[0].token);
          localStorage.setItem('userType',res.userType);
          this.presentToast(res.msg);
          this.dismissLoader();
          this.router.navigate(['/user/home']);
        }
        else if(res.status == 'success' && res.userType == 'driver')
          {
            localStorage.setItem('token',res.driver[0].token);
            localStorage.setItem('userType',res.userType);
            this.presentToast(res.msg);
            this.dismissLoader();
            this.router.navigate(['/driver/home']);
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
