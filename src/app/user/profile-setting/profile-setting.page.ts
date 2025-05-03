import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../../userapi.service';
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

  constructor(private api:UserapiService,private router:Router,private toastController: ToastController) { }
  UserProfile:any;
  ngOnInit() {
    this.api.user_profile().subscribe((res:any)=>{
      console.log(res);
      this.UserProfile = res.data.user_profile_info;
    })
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
  ionViewWillEnter()
  {
    this.api.user_profile().subscribe((res:any)=>{
      console.log(res);
      this.UserProfile = res.data.user_profile_info;
    })
  }
  deleteAccount()
  {
    if(confirm("Are you sure you want to delete your account Permanently?"))
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
}

