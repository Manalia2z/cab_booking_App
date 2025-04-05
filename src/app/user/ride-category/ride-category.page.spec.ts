import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RideCategoryPage } from './ride-category.page';

describe('RideCategoryPage', () => {
  let component: RideCategoryPage;
  let fixture: ComponentFixture<RideCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RideCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
