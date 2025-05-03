import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleDocumentListPage } from './vehicle-document-list.page';

describe('VehicleDocumentListPage', () => {
  let component: VehicleDocumentListPage;
  let fixture: ComponentFixture<VehicleDocumentListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDocumentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
