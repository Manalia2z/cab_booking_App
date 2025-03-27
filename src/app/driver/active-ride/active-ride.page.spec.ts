import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveRidePage } from './active-ride.page';

describe('ActiveRidePage', () => {
  let component: ActiveRidePage;
  let fixture: ComponentFixture<ActiveRidePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
