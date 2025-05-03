import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveRideDetPage } from './active-ride-det.page';

describe('ActiveRideDetPage', () => {
  let component: ActiveRideDetPage;
  let fixture: ComponentFixture<ActiveRideDetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRideDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
