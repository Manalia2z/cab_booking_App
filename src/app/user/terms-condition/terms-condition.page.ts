import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
import { UserapiService } from '../../userapi.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
  standalone:false
})
export class TermsConditionPage implements OnInit {

  constructor(private api : UserapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {

   }
   terms_condition:any;
   terms_status:any;
  ngOnInit() {
    this.terms_status = 'user';
    this.api.getTermsCondition(this.terms_status).subscribe((res:any)=>{
      console.log(res);
      this.terms_condition = res.data;
    })
  }

}

