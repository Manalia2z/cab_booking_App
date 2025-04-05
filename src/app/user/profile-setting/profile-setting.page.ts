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

  constructor(private api:UserapiService) { }
  UserProfile:any;
  ngOnInit() {
    this.api.user_profile().subscribe((res:any)=>{
      console.log(res);
      this.UserProfile = res.data.user_profile_info;
    })
  }
 
}

