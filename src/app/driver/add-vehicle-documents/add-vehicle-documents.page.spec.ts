import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVehicleDocumentsPage } from './add-vehicle-documents.page';

describe('AddVehicleDocumentsPage', () => {
  let component: AddVehicleDocumentsPage;
  let fixture: ComponentFixture<AddVehicleDocumentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleDocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
