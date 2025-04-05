import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  userType: string = '';

  constructor() {
    this.checkUserType();
  }

 ionViewWillEnter()
 {
  this.checkUserType();                    
 }

  checkUserType() {
    // Fetch user type from local storage or API (modify this logic as needed)
    const storedUserType = localStorage.getItem('userType'); 
    const token = localStorage.getItem('token'); 
    if(storedUserType == 'user' && token)
    {
      this.userType = 'user';
    }
    if(storedUserType == 'driver' && token)
    {
      this.userType = 'driver';
    }
  }

}
