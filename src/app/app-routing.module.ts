import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule),
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then( m => m.DriverModule)
  },
  {
    path: 'user-registration',
    loadChildren: () => import('./user-registration/user-registration.module').then( m => m.UserRegistrationPageModule)
  },
  {
    path: 'driver-registration',
    loadChildren: () => import('./driver-registration/driver-registration.module').then( m => m.DriverRegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-with-number',
    loadChildren: () => import('./login-with-number/login-with-number.module').then( m => m.LoginWithNumberPageModule)
  },
  {
    path: 'send-otp',
    loadChildren: () => import('./send-otp/send-otp.module').then( m => m.SendOtpPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
