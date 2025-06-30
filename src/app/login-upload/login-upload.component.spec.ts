import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUploadComponent } from './login-upload.component';

describe('LoginUploadComponent', () => {
  let component: LoginUploadComponent;
  let fixture: ComponentFixture<LoginUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginUploadComponent]
    });
    fixture = TestBed.createComponent(LoginUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
