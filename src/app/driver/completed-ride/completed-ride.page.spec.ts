import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedRidePage } from './completed-ride.page';

describe('CompletedRidePage', () => {
  let component: CompletedRidePage;
  let fixture: ComponentFixture<CompletedRidePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
