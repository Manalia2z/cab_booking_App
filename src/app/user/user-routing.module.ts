import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
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
    path: 'search-location',
    loadChildren: () => import('./search-location/search-location.module').then( m => m.SearchLocationPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'ride-category',
    loadChildren: () => import('./ride-category/ride-category.module').then( m => m.RideCategoryPageModule)
  },
  {
    path: 'my-rides',
    loadChildren: () => import('./my-rides/my-rides.module').then( m => m.MyRidesPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
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
    path: 'search-by-stops',
    loadChildren: () => import('./search-by-stops/search-by-stops.module').then( m => m.SearchByStopsPageModule)
  },
  {
    path: 'active-ride-det/:trip_id',
    loadChildren: () => import('./active-ride-det/active-ride-det.module').then( m => m.ActiveRideDetPageModule)
  },
  {
    path: 'complete-ride-det',
    loadChildren: () => import('./complete-ride-det/complete-ride-det.module').then( m => m.CompleteRideDetPageModule)
  },
  {
    path: 'search-location-outstation',
    loadChildren: () => import('./search-location-outstation/search-location-outstation.module').then( m => m.SearchLocationOutstationPageModule)
  },
  {
    path: 'outstation-ride-det/:id',
    loadChildren: () => import('./outstation-ride-det/outstation-ride-det.module').then( m => m.OutstationRideDetPageModule)
  },
  {
    path: 'fare-details',
    loadChildren: () => import('./fare-details/fare-details.module').then( m => m.FareDetailsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
