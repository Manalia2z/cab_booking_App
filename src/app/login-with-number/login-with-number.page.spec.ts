import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginWithNumberPage } from './login-with-number.page';

describe('LoginWithNumberPage', () => {
  let component: LoginWithNumberPage;
  let fixture: ComponentFixture<LoginWithNumberPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
