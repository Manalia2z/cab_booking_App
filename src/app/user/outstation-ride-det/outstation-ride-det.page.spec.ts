import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutstationRideDetPage } from './outstation-ride-det.page';

describe('OutstationRideDetPage', () => {
  let component: OutstationRideDetPage;
  let fixture: ComponentFixture<OutstationRideDetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstationRideDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
