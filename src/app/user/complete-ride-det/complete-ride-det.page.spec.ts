import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteRideDetPage } from './complete-ride-det.page';

describe('CompleteRideDetPage', () => {
  let component: CompleteRideDetPage;
  let fixture: ComponentFixture<CompleteRideDetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRideDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
