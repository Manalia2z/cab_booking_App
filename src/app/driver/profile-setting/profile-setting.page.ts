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
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.page.html',
  styleUrls: ['./profile-setting.page.scss'],
  standalone:false
})
export class ProfileSettingPage implements OnInit {

  constructor(private platform: Platform,private http: HttpClient,private api : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController) {
    
   }
driverinfo:any;
imgpath:any;
ngOnInit() {
  this.imgpath = localStorage.getItem('imgpath');
    this.api.driver_profile().subscribe((res:any)=>{
      this.driverinfo = res.data.driver_info;
      console.log(res);
  });

}

deleteAccount()
{
  if(confirm("Are you sure you want to delete your account?"))
  {
    this.api.delete_account().subscribe((res:any)=>{
      console.log(res);
      if(res.status == 'success')
      { 
        this.presentToast(res.message);
        localStorage.clear();
        this.router.navigate(['/login']);
        location.href='/login';
      }else{
        this.presentToast(res.message);
      }
    })
  }
}
logout()
{
  if(confirm("Are you sure you want to logout?")){
  localStorage.clear();
  this.router.navigate(['/login']);
  location.href='/login';
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
handleRefresh(event: CustomEvent) {
  setTimeout(() => {
    // Any calls to load data go here
    this.ngOnInit();
    (event.target as HTMLIonRefresherElement).complete();
  }, 2000);
}
}
