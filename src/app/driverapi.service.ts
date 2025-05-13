import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverapiService {

    token = localStorage.getItem('token');
    // endpoint:any='http://localhost/deenas-cab-and-auto/api/'
    endpoint:any='https://a2zithub.org/deenas_cab/api/';
    constructor(private http:HttpClient) {
      // localStorage.setItem('imgpath', 'http://localhost/deenas-cab-and-auto/uploads/'); 
      // localStorage.setItem('path', 'http://localhost/deenas-cab-and-auto/api/');
      localStorage.setItem('imgpath', 'https://a2zithub.org/deenas_cab/uploads/'); 
      localStorage.setItem('path', 'https://a2zithub.org/deenas_cab/');
      // localStorage.setItem('imgpath', 'https://192.168.1.151/cab_booking/uploads/'); 
      // localStorage.setItem('path', 'https://192.168.1.151/cab_booking/');

     }

     driverRegistration(data:any)
     {
      return this.http.post(this.endpoint+'driverRegistration',data)
     }
     uploadDriverDocuments(d_license_photo:any,d_pan_photo:any,driver_photo:any)
     {
      return this.http.post(this.endpoint+'uploadDriverDocuments',{'d_license':d_license_photo,'d_pan_photo':d_pan_photo,'driver_photo':driver_photo,'token':this.token});
     }
     uploadVehicleDocuments(data:any,Insurance_doc:any,rc_book:any,permit_doc:any)
     {
      return this.http.post(this.endpoint+'uploadVehicleDocuments',{'data':data,'Insurance_doc':Insurance_doc,'rc_book':rc_book,'permit_doc':permit_doc,'token':this.token});
     }
     trip_list()
     {
      return this.http.get(this.endpoint+'trip_list');
     }
     getDriverDetails()
     {
      return this.http.post(this.endpoint+'getDriverDetails',{'token':this.token});
     }
     outstationTripListD()
     {
      return this.http.post(this.endpoint+'outstationTripListD',{token:this.token});
     }
     set_driver_availability(status:any,longitude:any,latitude:any)
     {
      return this.http.post(this.endpoint+'set_driver_availability',{'token':this.token,'d_availability':status,'longitude':longitude,'latitude':latitude});
     }
     AutoLocationTrackingDriver(status:any,longitude:any,latitude:any)
     {
      return this.http.post(this.endpoint+'AutoLocationTrackingDriver',{'token':this.token,'d_availability':status,'longitude':longitude,'latitude':latitude});
     }
     driver_dashboard()
     {
      return this.http.post(this.endpoint+'driver_dashboard',{token:this.token});
     }
     AllActiveRidesOfDriver()
     {
      return this.http.post(this.endpoint+'AllActiveRidesOfDriver',{token:this.token});
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
      return this.http.post(this.endpoint+'saveDriverBankDet',{formData:formData,token:this.token});
     }
     driver_profile(){
      return this.http.post(this.endpoint+'driver_profile',{token:this.token});
      
     }
     delete_account()
     {
      return this.http.post(this.endpoint+'delete_driver_account',{token:this.token});
     }
     vehicle_reg_list()
     {
      return this.http.post(this.endpoint+'vehicle_reg_list',{token:this.token});
     }
     vehicle_reg_verified_list()
     {
      return this.http.post(this.endpoint+'vehicle_reg_verified_list',{token:this.token});
     }
     checkDriverTodayPayment()
     {
      return this.http.post(this.endpoint+'checkDriverTodayPayment',{token:this.token});
     }
     vehicle_details(id:any)
     {
      return this.http.post(this.endpoint+'vehicle_details',{vehicle_tbl_id:id,token:this.token});
     }
     getTermsCondition(terms_for:any)
     {
      return this.http.post(this.endpoint+'getTermsCondition',{'terms_for':terms_for,'token':this.token});
     }

     getPrivacyPolicy(privacy_for:any)
     {
      return this.http.post(this.endpoint+'getPrivacyPolicy',{'privacy_for':privacy_for,'token':this.token});
     }
     updateDriverDet(data:any)
     {
      return this.http.post(this.endpoint+'updateDriverDet',{'data':data,'token':this.token});
     }
     tripList()
     {
      return this.http.get(this.endpoint+'tripList');
      // return this.http.post(this.endpoint+'tripList',{'token':this.token});
     }
     acceptTrip(tripId:any,selectedVehicleId:any){
      this.token = localStorage.getItem('token');

      return this.http.post(this.endpoint+'acceptTrip',{'trip_tbl_id':tripId,'token':this.token,'vehicle_tbl_id':selectedVehicleId});
    }

    acceptedTrips(){
      return this.http.post(this.endpoint+'acceptedTrips',{'token':this.token});
     }
     acceptedTripsDet(tripId:any){
      return this.http.post(this.endpoint+'acceptedTripsDet',{'trip_tbl_id':tripId,'token':this.token})
     }
     TripListByDriver(status:any){
      return this.http.post(this.endpoint+'TripListByDriver',{'trip_status':status,'token':this.token});
     }
    confirmTrips(status:any){
      return this.http.post(this.endpoint+'acceptedTrips',{'trip_status':status,'token':this.token});
     }
     check_userPickupOtp(formData:any)
     {
      return this.http.post(this.endpoint+'check_userPickupOtp',{formData})
     }
     completeRide(trip_tbl_id:any){
      return this.http.post(this.endpoint+'completeRide',{'trip_tbl_id':trip_tbl_id,'token':this.token});
     }
     confirmPaymentByCash(trip_tbl_id:any){
      return this.http.post(this.endpoint+'confirmPaymentByCash',{'trip_tbl_id':trip_tbl_id,'token':this.token});
     }
     active_vehicle(id:any){
      return this.http.post(this.endpoint+'active_vehicle',{'vehicle_tbl_id':id,'token':this.token});
     }
     getCity()
     {
      return this.http.get(this.endpoint+'getCity');
     }
     driver_availibility_list(){
      return this.http.post(this.endpoint+'driver_availibility_list',{'token':this.token});;
     }
     createOrderId(amt:any)
     {
      return this.http.post(this.endpoint+'createOrderId',{'amt':amt,'token':this.token});;

     }
}
