import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutstationRidesPage } from './outstation-rides.page';

describe('OutstationRidesPage', () => {
  let component: OutstationRidesPage;
  let fixture: ComponentFixture<OutstationRidesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstationRidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
