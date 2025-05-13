
import { Component, Input ,OnInit,ChangeDetectorRef } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController,ModalController  } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText, IonThumbnail } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-fare-details-driver',
  templateUrl: './fare-details-driver.component.html',
  styleUrls: ['./fare-details-driver.component.scss'],
   imports: [CommonModule],
})
export class FareDetailsDriverComponent  implements OnInit{
 @Input() fareId: any;
  constructor(private api:UserapiService, private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private modalCtrl: ModalController,
     private iab: InAppBrowser,
    private toastController: ToastController) { }
    fare:any;
  ngOnInit() {
    console.log(this.fareId);
    this.showLoader();
    this.api.getFareDetails(this.fareId).subscribe((res:any)=>{
      console.log("getFareDetails --- ",res);
      this.fare = res.data.fare_det
;
    })
  }
  close()
  {
    this.modalCtrl.dismiss();
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
  
  async showLoader() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000, // 3 seconds
      spinner: 'crescent' // Optional: Use 'bubbles', 'circles', 'crescent', 'dots' etc.
    });

    await loading.present();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }
  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
    });
  
    await toast.present();
  }
}
