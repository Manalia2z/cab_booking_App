import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverFeedbackListPage } from './driver-feedback-list.page';

describe('DriverFeedbackListPage', () => {
  let component: DriverFeedbackListPage;
  let fixture: ComponentFixture<DriverFeedbackListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverFeedbackListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
