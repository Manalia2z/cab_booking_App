import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  token = localStorage.getItem('token');
    // endpoint:any='http://localhost/cab_booking/api/';
    endpoint:any='https://192.168.1.151/cab_booking/api/';
    constructor(private http:HttpClient) {
      // localStorage.setItem('imgpath', 'http://localhost/cab_booking/uploads/'); 
      // localStorage.setItem('path', 'http://localhost/cab_booking/api/');
      localStorage.setItem('imgpath', 'https://192.168.1.151/cab_booking/uploads/'); 
      localStorage.setItem('path', 'https://192.168.1.151/cab_booking/');
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

     SearchLocation(data:any,searchType:any)
     {
      return this.http.post(this.endpoint+'SearchLocation',{'searchLocation':data,'searchType':searchType});
     }
     bookTrip(data:any,locationData:any,token:any)
     {
      return this.http.post(this.endpoint+'bookTrip',{'form':data,'locationData':locationData,'token':token});
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
     ride_category()
     {
      return this.http.get(this.endpoint+'ride_category');
     }
     getPrivacyPolicy(privacy_for:any)
     {
      return this.http.post(this.endpoint+'getPrivacyPolicy',{'privacy_for':privacy_for,'token':this.token})
     }
     userTripList(status:any)
     {
      return this.http.post(this.endpoint+'userTripList',{'trip_status':status,'token':this.token})
     }
     userTripDetails(status:any)
     {
      return this.http.post(this.endpoint+'userTripDetails',{'trip_status':status,'token':this.token})
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

}
