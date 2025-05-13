import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FareDetailsPage } from './fare-details.page';

describe('FareDetailsPage', () => {
  let component: FareDetailsPage;
  let fixture: ComponentFixture<FareDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FareDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
