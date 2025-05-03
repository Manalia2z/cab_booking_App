import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchByStopsPage } from './search-by-stops.page';

describe('SearchByStopsPage', () => {
  let component: SearchByStopsPage;
  let fixture: ComponentFixture<SearchByStopsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByStopsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
