import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../../userapi.service';
import { DriverapiService } from '../../driverapi.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController,ToastController } from '@ionic/angular';
@Component({
  selector: 'app-driver-document-verify',
  templateUrl: './driver-document-verify.page.html',
  styleUrls: ['./driver-document-verify.page.scss'],
  standalone:false
})
export class DriverDocumentVerifyPage implements OnInit {

   constructor(private api : DriverapiService,
     private activateRoute: ActivatedRoute,
     private router: Router,
     private fb: FormBuilder,
     private loadingController: LoadingController,
     private toastController: ToastController
   ) { }
   loginForm : any = new FormGroup({
    "d_license_photo": new FormControl("", [Validators.required]),
    "d_pan_photo":  new FormControl("", 
      [
        Validators.required,
      ]
      ),
    "driver_photo":  new FormControl("", 
      [
        Validators.required,
      ]
    ),
  });
  loader : any;
  token:any;
  ngOnInit() {
  }
  imageUrl: string | null = null;
  imageUrl1: string | null = null;
  imageUrl2: string | null = null;
  drivingLicense: File | null = null;
  drivingPan: File | null = null;
  driverPhoto: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.drivingLicense = file; // Store file for upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Display image preview
      };
      reader.readAsDataURL(file);
      console.log(this.drivingLicense);
    }
  }

  onFileSelected1(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.drivingPan = file; // Store file for upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl1 = e.target.result; // Display image preview
      };
      reader.readAsDataURL(file);
      console.log(this.drivingPan);
    }
  }
  onFileSelected2(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.driverPhoto = file; // Store file for upload
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl2 = e.target.result; // Display image preview
      };
      reader.readAsDataURL(file);
      console.log(this.driverPhoto);
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
  uploadDriverDocuments()
  {
 

    if (this.loginForm.valid) {
      // this.showLoading("Please Wait..");
      console.log(this.loginForm.value);
      this.api.uploadDriverDocuments(this.imageUrl,this.imageUrl1,this.imageUrl2).subscribe((res:any)=>{
        console.log("res",res);
        
        if(res.status == 'success')
        {
          this.presentToast(res.msg);
          this.dismissLoader();
          this.router.navigate(['/driver/vehicle-registration']);
        }
        else{
          this.presentToast(res.msg);
          this.dismissLoader();
        }
      })
    }
    else{
      this.markFormGroupTouched(this.loginForm);
    }
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
