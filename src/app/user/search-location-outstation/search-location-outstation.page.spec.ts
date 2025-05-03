import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchLocationOutstationPage } from './search-location-outstation.page';

describe('SearchLocationOutstationPage', () => {
  let component: SearchLocationOutstationPage;
  let fixture: ComponentFixture<SearchLocationOutstationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLocationOutstationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
