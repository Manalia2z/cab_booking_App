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
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-vehicle-reg-list',
  templateUrl: './vehicle-reg-list.page.html',
  styleUrls: ['./vehicle-reg-list.page.scss'],
  standalone: false

})
export class VehicleRegListPage implements OnInit {

  constructor(private platform: Platform,private http: HttpClient,private api : DriverapiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private iab: InAppBrowser,
  ) {
    
   }
list:any;
ngOnInit() {
    this.api.vehicle_reg_list().subscribe((res:any)=>{
      console.log(res);
      this.list = res.data.list;
  });
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
uploadVehicleDoc(id:any)
{
  this.router.navigate(['/driver/add-vehicle-documents/'+id]);
}
deleteVehicle(id:any)
{
  this.router.navigate(['/driver/add-vehicle-documents/'+id]);
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
handleRefresh(event: CustomEvent) {
  setTimeout(() => {
    // Any calls to load data go here
    this.ngOnInit();
    (event.target as HTMLIonRefresherElement).complete();
  }, 2000);
}
  payNow(amt:any,vehicle_tbl_id:any)
  {
    
    this.api.createOrderId(amt).subscribe((res:any)=>{
      console.log(res);
    
      this.dismissLoader();
      if (res.status && res.order_id) {
        this.showLoading('Ridirecting...');
        const redirectUrl = `https://a2zithub.org/deenas_cab/api/checkout?order_id=${res.order_id}&key=${res.key}&amount=${res.amount}&vehicle_tbl_id=${vehicle_tbl_id}&user_token=${localStorage.getItem('token')}`;
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
            this.ngOnInit();
            browser.close();
          } else if (event.url.includes('failed')) {
            this.presentToast('Payment Failed!');
            alert('Payment Failed!');
            this.dismissLoader();
            this.ngOnInit();
            browser.close();
          }
        });
      }
    });
  

  }
activeVehicle(id:any){
  console.log(id);
  this.api.active_vehicle(id).subscribe((res:any)=>{
    console.log(res);
    if(res.status == 'success'){
      this.presentToast(res.msg);
      this.ngOnInit();
    }else{
      this.presentToast(res.msg);
    }
  });
}
}

