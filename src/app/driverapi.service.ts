import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverapiService {

    // endpoint:any='http://localhost/Git/Mahanubhav/api/'
    token = localStorage.getItem('token');
    endpoint:any='http://localhost/cab_booking/api/'
    // endpoint:any='https://192.168.1.151/cab_booking/api/'
    constructor(private http:HttpClient) {
      localStorage.setItem('imgpath', 'http://localhost/cab_booking/api/uploads/'); 
      localStorage.setItem('path', 'http://localhost/cab_booking/api/');

      // localStorage.setItem('imgpath', 'https://192.168.1.151/cab_booking/uploads/'); 
      // localStorage.setItem('path', 'https://192.168.1.151/cab_booking/');

     }

     driverRegistration(data:any)
     {
      return this.http.post(this.endpoint+'driverRegistration',data)
     }
     uploadDriverDocuments(d_license_photo:any,d_pan_photo:any,driver_photo:any)
     {
      return this.http.post(this.endpoint+'uploadDriverDocuments',{'d_license':d_license_photo,'d_pan_photo':d_pan_photo,'driver_photo':driver_photo,'token':this.token})
     }

}
