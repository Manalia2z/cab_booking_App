import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController,ModalController  } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText, IonThumbnail } from '@ionic/angular/standalone';
import { PayDueTodayComponent } from 'src/app/components/pay-due-today/pay-due-today.component';
@Component({
  selector: 'app-outstation-rides',
  templateUrl: './outstation-rides.page.html',
  styleUrls: ['./outstation-rides.page.scss'],
  standalone: false
})
export class OutstationRidesPage implements OnInit {

  constructor(private api:DriverapiService, private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private toastController: ToastController) { }
trip_list:any;
  ngOnInit() {
    this.api.outstationTripListD().subscribe((res:any)=>{
      console.log("outstationTripList --- ",res);
      this.trip_list = res.data.trip;
    })
  }

}
