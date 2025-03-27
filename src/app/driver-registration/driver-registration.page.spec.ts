import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverRegistrationPage } from './driver-registration.page';

describe('DriverRegistrationPage', () => {
  let component: DriverRegistrationPage;
  let fixture: ComponentFixture<DriverRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
