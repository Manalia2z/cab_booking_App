import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRideComponent } from './new-ride/new-ride.component';
import { AvailibilityComponent } from './availibility/availibility.component';



@NgModule({
  declarations: [NewRideComponent,AvailibilityComponent],
  imports: [
    CommonModule,
  ],
  exports : [NewRideComponent,AvailibilityComponent]
})
export class NewOrderModule { }
