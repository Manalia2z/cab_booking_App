import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverBankDetailsPage } from './driver-bank-details.page';

describe('DriverBankDetailsPage', () => {
  let component: DriverBankDetailsPage;
  let fixture: ComponentFixture<DriverBankDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBankDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
