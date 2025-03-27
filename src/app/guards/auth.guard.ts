import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (token && userType == 'user') {
      return true;
    }
    else if (token && userType == 'driver') {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
