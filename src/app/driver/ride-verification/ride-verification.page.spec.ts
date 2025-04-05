import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RideVerificationPage } from './ride-verification.page';

describe('RideVerificationPage', () => {
  let component: RideVerificationPage;
  let fixture: ComponentFixture<RideVerificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RideVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
