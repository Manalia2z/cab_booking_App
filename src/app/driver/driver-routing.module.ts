import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  {
  path: 'home',
  loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'footer',
  loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
},
{
  path: 'profile-setting',
  loadChildren: () => import('./profile-setting/profile-setting.module').then( m => m.ProfileSettingPageModule)
},
{
  path: 'edit-profile',
  loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
},
{
  path: 'driver-document-verify',
  loadChildren: () => import('./driver-document-verify/driver-document-verify.module').then( m => m.DriverDocumentVerifyPageModule)
},  {
    path: 'vehicle-registration',
    loadChildren: () => import('./vehicle-registration/vehicle-registration.module').then( m => m.VehicleRegistrationPageModule)
  },
  {
    path: 'driver-bank-details',
    loadChildren: () => import('./driver-bank-details/driver-bank-details.module').then( m => m.DriverBankDetailsPageModule)
  },
  {
    path: 'active-ride',
    loadChildren: () => import('./active-ride/active-ride.module').then( m => m.ActiveRidePageModule)
  },
  {
    path: 'my-rides',
    loadChildren: () => import('./my-rides/my-rides.module').then( m => m.MyRidesPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
