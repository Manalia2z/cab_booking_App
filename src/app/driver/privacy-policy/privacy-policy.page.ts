import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
import { DriverapiService } from '../../driverapi.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
  standalone:false
})
export class PrivacyPolicyPage implements OnInit {

  constructor(private api : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {

   }
   privacy_policy:any;
   privacy_status:any;
  ngOnInit() {
    this.privacy_status = 'user';
    this.api.getPrivacyPolicy(this.privacy_status).subscribe((res:any)=>{
      console.log(res);
      this.privacy_policy = res.data.privacy_policy;
    })
  }

}
