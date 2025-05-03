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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone:false
})
export class EditProfilePage implements OnInit {

 constructor(private platform: Platform,private http: HttpClient,private api : UserapiService,
     private activateRoute: ActivatedRoute,
     private router: Router,
     private fb: FormBuilder,
     private loadingController: LoadingController,
     private toastController: ToastController) {
     this.platform.ready().then(() => {
       if (this.platform.is('cordova')) {
         console.log('Cordova is available');
         // Use Cordova plugins here
       } else {
         console.log('Cordova not available, using web fallback');
       }
     });
    }
 
    editForm: any = new FormGroup({
      "u_name": new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]+$") // Only letters and optional spaces
      ]),
      "u_email": new FormControl("", [Validators.required]),
      "u_number": new FormControl("", [Validators.required]),
      "u_password": new FormControl("", [Validators.required]),
      "city_tbl_id": new FormControl("", [Validators.required]),
    });
    
   city:any;
   city_tbl_id:any;
  ngOnInit() {
    this.api.getCity().subscribe((res:any)=>{
      console.log(res); 
      this.city = res.data;
    })
    this.api.getUserDetails().subscribe((res:any)=>{
          console.log(res);
          this.editForm.patchValue({
          u_name:res.data.det[0].u_name,
          u_email:res.data.det[0].u_email,
          u_number:res.data.det[0].u_number,
          u_password:res.data.det[0].u_password,
          city_tbl_id:res.data.det[0].city_tbl_id,
        })

        this.city_tbl_id = res.data.det[0].city_tbl_id;
      });
  }
  UpdateUser()
  {
    if(this.editForm.valid) {
      console.log(this.editForm.value);
      this.api.updateUserDetails(this.editForm.value).subscribe((res:any)=>{
        console.log(res);
        if(res.status == 'success')
        {
          this.presentToast(res.msg);
          this.router.navigate(['/user/profile-setting']);
        }else{
          this.presentToast(res.msg);
        }
      })

    }else{
      this.markFormGroupTouched(this.editForm);
    }
  }
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
     
      this.ngOnInit();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
