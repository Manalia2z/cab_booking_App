import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverDocumentVerifyPage } from './driver-document-verify.page';

describe('DriverDocumentVerifyPage', () => {
  let component: DriverDocumentVerifyPage;
  let fixture: ComponentFixture<DriverDocumentVerifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDocumentVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
