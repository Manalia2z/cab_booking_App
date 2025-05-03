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
},
  {
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
  {
    path: 'ride-verification',
    loadChildren: () => import('./ride-verification/ride-verification.module').then( m => m.RideVerificationPageModule)
  },
  {
    path: 'driver-feedback-list',
    loadChildren: () => import('./driver-feedback-list/driver-feedback-list.module').then( m => m.DriverFeedbackListPageModule)
  },
  {
    path: 'trip-details',
    loadChildren: () => import('./trip-details/trip-details.module').then( m => m.TripDetailsPageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./terms-condition/terms-condition.module').then( m => m.TermsConditionPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'active-ride-det/:id',
    loadChildren: () => import('./active-ride-det/active-ride-det.module').then( m => m.ActiveRideDetPageModule)
  },
  {
    path: 'complete-ride-det',
    loadChildren: () => import('./complete-ride-det/complete-ride-det.module').then( m => m.CompleteRideDetPageModule)
  },
  {
    path: 'completed-ride',
    loadChildren: () => import('./completed-ride/completed-ride.module').then( m => m.CompletedRidePageModule)
  },
  {
    path: 'cancel-ride',
    loadChildren: () => import('./cancel-ride/cancel-ride.module').then( m => m.CancelRidePageModule)
  },
  {
    path: 'vehicle-reg-list',
    loadChildren: () => import('./vehicle-reg-list/vehicle-reg-list.module').then( m => m.VehicleRegListPageModule)
  },
  {
    path: 'add-vehicle-documents/:id',
    loadChildren: () => import('./add-vehicle-documents/add-vehicle-documents.module').then( m => m.AddVehicleDocumentsPageModule)
  },
  {
    path: 'vehicle-document-list',
    loadChildren: () => import('./vehicle-document-list/vehicle-document-list.module').then( m => m.VehicleDocumentListPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
