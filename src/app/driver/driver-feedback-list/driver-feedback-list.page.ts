import { Component, OnInit } from '@angular/core';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';


@Component({
  selector: 'app-driver-feedback-list',
  templateUrl: './driver-feedback-list.page.html',
  styleUrls: ['./driver-feedback-list.page.scss'],
  standalone:false
})
export class DriverFeedbackListPage implements OnInit {

  constructor(private api:DriverapiService) { }
  driver_feedback_list:any;
  ngOnInit() {
    this.api.driver_feedback_list('confirm').subscribe((res:any)=>{
      console.log(res);
      this.driver_feedback_list = res.data;
    })
  }

}

