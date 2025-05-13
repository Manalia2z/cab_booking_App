import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  token = localStorage.getItem('token');
    // endpoint:any='http://localhost/deenas-cab-and-auto/api/';
    endpoint:any='https://a2zithub.org/deenas_cab/api/'

    // endpoint:any='https://192.168.1.151/deenas-cab-and-auto/api/';
    constructor(private http:HttpClient) {
      // localStorage.setItem('imgpath', 'http://localhost/deenas-cab-and-auto/uploads/'); 
      // localStorage.setItem('path', 'http://localhost/deenas-cab-and-auto/api/');
      localStorage.setItem('imgpath', 'https://a2zithub.org/deenas_cab/uploads/'); 
      localStorage.setItem('path', 'https://a2zithub.org/deenas_cab/');
     }

     userRegistration(data:any){
      return this.http.post(this.endpoint+'userRegistration',data)
     }
     get_vehicle_types(){
      return this.http.get(this.endpoint+'get_vehicle_types')
     }
     login(data:any){
      return this.http.post(this.endpoint+'login',data)
     }
     vehicle_brand_list()
     {
      return this.http.get(this.endpoint+'vehicle_brand_list')
     }
     SearchLocation(data:any,searchType:any)
     {
      return this.http.post(this.endpoint+'SearchLocation',{'searchLocation':data,'searchType':searchType});
     }
     bookTrip(data:any,locationData:any,token:any,fare_det:any)
     {
      return this.http.post(this.endpoint+'bookTrip',{'form':data,'locationData':locationData,'token':token,'fare_det':fare_det});
     }
     book_Trip(locationData:any,token:any,fare_det:any)
     {
      return this.http.post(this.endpoint+'saveTripAuto',{'locationData':locationData,'token':token,'fare_det':fare_det,});
     }
     save_outstation(formData:any,locationData:any,token:any,fare_det:any)
     {
      return this.http.post(this.endpoint+'save_outstation',{'form':formData,'locationData':locationData,'token':token,'fare_det':fare_det,});
     }
     saveTripManually(point1:any,point2:any,payment_amt:any,payment_mode:any,city_stops_tbl_id:any,distance:any,duration:any,shared_mode:any)
     {
      return this.http.post(this.endpoint+'saveTripManually',{'point1':point1,'point2':point2,'payment_amt':payment_amt,'payment_mode':payment_mode,'city_stops_tbl_id':city_stops_tbl_id,'distance':distance,'duration':duration,'token':this.token,'shared_mode':shared_mode});
     }
     GetPlaceDetails(data:any)
     {
      return this.http.post(this.endpoint+'GetPlaceDetails',{'place_id':data});
     }
     getDistanceCalculation(pickupLocation:any,pickUpCity:any,pickUpAddress:any,pickUplatitude:any,pickUplongitude:any,pickUpPostalCode:any,pickUpState:any,destination:any,dropLocation:any,dropCity:any,dropAddress:any,droplatitude:any,droplongitude:any,dropPostalCode:any,dropState:any)
     {
      var formData = new FormData();
      formData.append("pickupLocation",pickupLocation);
      formData.append("pickUpCity",pickUpCity);
      formData.append("pickUpAddress",pickUpAddress);
      formData.append("pickUplatitude",pickUplatitude);
      formData.append("pickUplongitude",pickUplongitude);
      formData.append("pickUpPostalCode",pickUpPostalCode);
      formData.append("pickUpState",pickUpState);
      formData.append("destination",destination);
      formData.append("dropLocation",dropLocation);
      formData.append("dropCity",dropCity);
      formData.append("dropAddress",dropAddress);
      formData.append("droplatitude",droplatitude);
      formData.append("droplongitude",droplongitude);
      formData.append("dropPostalCode",dropPostalCode);
      formData.append("dropState",dropState);
      return this.http.post(this.endpoint+'getDistanceCalculation',{'pickupLocation':pickupLocation,'pickUpCity':pickUpCity,'pickUpAddress':pickUpAddress,'pickUplatitude':pickUplatitude,'pickUplongitude':pickUplongitude,'pickUpPostalCode':pickUpPostalCode,'pickUpState':pickUpState,'destination':destination,'dropLocation':dropLocation,'dropCity':dropCity,'dropAddress':dropAddress,'droplatitude':droplatitude,'droplongitude':droplongitude,'dropPostalCode':dropPostalCode,'dropState':dropState});

     }
     calculatefareDistance(brandId:any,duration:any,distance:any)
     {
      return this.http.post(this.endpoint+'calculatefareDistance',{'brandId':brandId,'duration':duration,'distance':distance,'token':this.token})
     }
     ride_category()
     {
      return this.http.get(this.endpoint+'ride_category');
     }
     getPrivacyPolicy(privacy_for:any)
     {
      return this.http.post(this.endpoint+'getPrivacyPolicy',{'privacy_for':privacy_for,'token':this.token})
     }
     userTripList()
     {
      return this.http.post(this.endpoint+'userTripList',{'token':this.token})
     }
     outstationTripList()
     {
      return this.http.post(this.endpoint+'outstationTripList',{'token':this.token})
     }
     userTripListDet(tripId:any)
     {
      return this.http.post(this.endpoint+'userTripListDet',{'trip_tbl_id':tripId,'token':this.token})
     }
     userTripDetails(tripId:any)
     {
      return this.http.post(this.endpoint+'userTripDetails',{'trip_tbl_id':tripId,'token':this.token})
     }
     getFareDetails(tripId:any)
     {
      return this.http.post(this.endpoint+'getFareDetails',{'trip_tbl_id':tripId,'token':this.token})
     }
      user_profile()
      {
      return this.http.post(this.endpoint+'user_profile',{'token':this.token});
      }
      getVehicleBrands(vehicle_type_tbl_id:any)
      {
       return this.http.post(this.endpoint+'getVehicleBrands',{vehicle_type_tbl_id:vehicle_type_tbl_id})
      }

      getTermsCondition(terms_for:any)
     {
      return this.http.post(this.endpoint+'getTermsCondition',{'terms_for':terms_for,'token':this.token})
     }

     isTripConfirmed(tripId:any)
     {
      return this.http.post(this.endpoint+'isTripConfirmed',{'trip_tbl_id':tripId,'token':this.token})
     }
     IsRideConfirmed(tripId:any)
     {
      return this.http.post(this.endpoint+'IsRideConfirmed',{'trip_tbl_id':tripId,'token':this.token})
     }
     isPaymentConfirmed(tripId:any)
     {
      return this.http.post(this.endpoint+'isPaymentConfirmed',{'trip_tbl_id':tripId,'token':this.token})
     }
     IsRideCompleted(tripId:any)
     {
      return this.http.post(this.endpoint+'IsRideCompleted',{'trip_tbl_id':tripId,'token':this.token})
     }
     saveDriverReview(formData:any)
     {
      return this.http.post(this.endpoint+'saveDriverReview',{'formData':formData,'token':this.token})
     }
     TripListByUser(status:any){
      return this.http.post(this.endpoint+'TripListByUser',{'trip_status':status,'token':this.token});
     }
     cancelTrip(id:any){
      return this.http.post(this.endpoint+'cancelTrip',{'trip_tbl_id':id,'token':this.token});
     }
     getUserDetails()
     {
      return this.http.post(this.endpoint+'getUserDetails',{'token':this.token})
     }
     updateUserDetails(data:any)
     {
      return this.http.post(this.endpoint+'updateUserDetails',{'data':data,'token':this.token});
     }
     GetLocationByLatLng(lat:any , long:any)
     {  
      return this.http.post(this.endpoint+'GetLocationByLatLng',{'latitude':lat,'longitude':long});
     }
     GetNearestStop(lat:any , long:any){
      return this.http.post(this.endpoint+'GetNearestStop',{'latitude':lat,'longitude':long});
     }
     getStops(stop:any){
      return this.http.post(this.endpoint+'getStops',{'stop_name':stop,'token':this.token});
     }
     getOutstationStops(stop:any){
      return this.http.post(this.endpoint+'getOutstationStops',{'stop_name':stop,'token':this.token});
     }
     getStopPointsDetails(pt1:any,pt2:any){
      return this.http.post(this.endpoint+'getStopPointsDetails',{'point_one':pt1,'point_two':pt2});
     }
     getCity()
     {
      return this.http.get(this.endpoint+'getCity');
     }
     delete_account()
      {
        return this.http.post(this.endpoint+'delete_account',{'token':this.token});
      }
}
