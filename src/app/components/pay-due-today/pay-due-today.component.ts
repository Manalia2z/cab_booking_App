
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UserapiService } from './../../userapi.service';
import { DriverapiService } from './../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController,ModalController  } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText, IonThumbnail } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-pay-due-today',
  templateUrl: './pay-due-today.component.html',
  styleUrls: ['./pay-due-today.component.scss'],
  imports: [CommonModule],
})
export class PayDueTodayComponent  implements OnInit {

  constructor(private api:DriverapiService,private geolocation: Geolocation,    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private modalCtrl: ModalController,
     private iab: InAppBrowser,
    private toastController: ToastController) {}
    det:any;
    veh_det:any;
    vehicle_id:any;
  ngOnInit() {
    localStorage.setItem('userType','driver');
    this.api.getDriverDetails().subscribe((res:any)=>{
      console.log(res);
      this.det = res.det.driver_det;
    })

    this.api.checkDriverTodayPayment().subscribe((res:any)=>{
      console.log(res);
      this.veh_det=res.activeVehicle;
      this.vehicle_id = res.activeVehicle[0]['vehicle_tbl_id'];
    })

  }
  payTodayDue(amt:any,vehicle_id:any) {
    // You can add actual payment logic here
    console.log('Pay Now clicked',amt,vehicle_id);
       this.api.createOrderId(amt).subscribe((res:any)=>{
         console.log(res);
       
         this.dismissLoader();
         if (res.status && res.order_id) {
           this.showLoading('Ridirecting...');
           const redirectUrl = `https://a2zithub.org/deenas_cab/api/payTodayDue?order_id=${res.order_id}&key=${res.key}&amount=${res.amount}&vehicle_tbl_id=${vehicle_id}&user_token=${localStorage.getItem('token')}`;
           console.log(redirectUrl);
           const browser: InAppBrowserObject = this.iab.create(redirectUrl, '_blank', {
             location: 'no',
             clearcache: 'yes',
             toolbar: 'no'
           });
           
           
   
           browser.on('loadstop').subscribe((event:any) => {
             if (event.url.includes('success')) {
               this.presentToast('Payment Success!');
               alert('Payment Success!');
               this.dismissLoader();
               this.modalCtrl.dismiss();
               this.ngOnInit();
               browser.close();
             } else if (event.url.includes('failed')) {
               this.presentToast('Payment Failed!');
               alert('Payment Failed!');
               this.dismissLoader();
               this.modalCtrl.dismiss();
               this.ngOnInit();
               browser.close();
             }
           });
         }
       });
    // this.modalCtrl.dismiss();
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
  close()
  {
    this.modalCtrl.dismiss();
  }
}
