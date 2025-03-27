import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleRegistrationPage } from './vehicle-registration.page';

describe('VehicleRegistrationPage', () => {
  let component: VehicleRegistrationPage;
  let fixture: ComponentFixture<VehicleRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
