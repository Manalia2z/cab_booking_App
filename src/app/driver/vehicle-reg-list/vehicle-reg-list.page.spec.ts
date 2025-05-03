import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleRegListPage } from './vehicle-reg-list.page';

describe('VehicleRegListPage', () => {
  let component: VehicleRegListPage;
  let fixture: ComponentFixture<VehicleRegListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRegListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
