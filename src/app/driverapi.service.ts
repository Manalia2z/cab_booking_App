import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverapiService {

    token = localStorage.getItem('token');
    // endpoint:any='http://localhost/cab_booking/api/'
    endpoint:any='https://192.168.1.151/cab_booking/api/'
    constructor(private http:HttpClient) {
      // localStorage.setItem('imgpath', 'http://localhost/cab_booking/uploads/'); 
      // localStorage.setItem('path', 'http://localhost/cab_booking/api/');

      localStorage.setItem('imgpath', 'https://192.168.1.151/cab_booking/uploads/'); 
      localStorage.setItem('path', 'https://192.168.1.151/cab_booking/');

     }

     driverRegistration(data:any)
     {
      return this.http.post(this.endpoint+'driverRegistration',data)
     }
     uploadDriverDocuments(d_license_photo:any,d_pan_photo:any,driver_photo:any)
     {
      return this.http.post(this.endpoint+'uploadDriverDocuments',{'d_license':d_license_photo,'d_pan_photo':d_pan_photo,'driver_photo':driver_photo,'token':this.token})
     }
     trip_list()
     {
      return this.http.get(this.endpoint+'trip_list');
     }
     getDriverDetails()
     {
      return this.http.post(this.endpoint+'getDriverDetails',{'token':this.token})
     }
     set_driver_availability(status:any,longitude:any,latitude:any)
     {
      return this.http.post(this.endpoint+'set_driver_availability',{'token':this.token,'d_availability':status,'longitude':longitude,'latitude':latitude});
     }
     driver_dashboard()
     {
      return this.http.post(this.endpoint+'driver_dashboard',{token:this.token})
     }
     driver_feedback_list(status:any)
     {
      return this.http.post(this.endpoint+'driver_feedback_list',{token:this.token,trip_status:status})
     }
     get_vehicle_types(){
      return this.http.get(this.endpoint+'get_vehicle_types')
     }
     getVehicleBrands(vehicle_type_tbl_id:any)
     {
      return this.http.post(this.endpoint+'getVehicleBrands',{vehicle_type_tbl_id:vehicle_type_tbl_id})
     }
     saveVehicleRegistration(formData:any,vehicle_photo:any)
     {
      return this.http.post(this.endpoint+'saveVehicleRegistration',{formData:formData,token:this.token,photo:vehicle_photo})
     }
     saveDriverBankDet(formData:any)
     {
      return this.http.post(this.endpoint+'saveDriverBankDet',{formData:formData,token:this.token})
     }
     driver_profile(){
      return this.http.post(this.endpoint+'driver_profile',{token:this.token})
      
     }

     getTermsCondition(terms_for:any)
     {
      return this.http.post(this.endpoint+'getTermsCondition',{'terms_for':terms_for,'token':this.token})
     }

     getPrivacyPolicy(privacy_for:any)
     {
      return this.http.post(this.endpoint+'getPrivacyPolicy',{'privacy_for':privacy_for,'token':this.token})
     }
     updateDriverDet(data:any)
     {
      return this.http.post(this.endpoint+'updateDriverDet',{'data':data,'token':this.token})
     }
     tripList()
     {
      return this.http.get(this.endpoint+'tripList');
     }
     acceptTrip(tripId:any){
      return this.http.post(this.endpoint+'acceptTrip',{'trip_tbl_id':tripId,'token':this.token})
      
     }

     

}
