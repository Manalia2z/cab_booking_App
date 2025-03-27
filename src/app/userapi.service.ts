import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

    token:any;
    endpoint:any='http://localhost/cab_booking/api/'
    // endpoint:any='https://192.168.1.151/cab_booking/api/'
    constructor(private http:HttpClient) {
      localStorage.setItem('imgpath', 'http://localhost/cab_booking/api/uploads/'); 
      localStorage.setItem('path', 'http://localhost/cab_booking/api/');

      // localStorage.setItem('imgpath', 'https://192.168.1.151/cab_booking/uploads/'); 
      // localStorage.setItem('path', 'https://192.168.1.151/cab_booking/');

     }

     userRegistration(data:any){
      return this.http.post(this.endpoint+'userRegistration',data)
     }

}
