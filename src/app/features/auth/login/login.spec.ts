import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

import { LoginComponent } from './login';

describe('Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: { dispatch: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    store = { dispatch: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: Store, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require an email and password', () => {
    expect(component.form.controls['email'].hasError('required')).toBe(true);
    expect(component.form.controls['password'].hasError('required')).toBe(true);
  });

  it('should not dispatch the login action when the form is invalid', () => {
    component.submit();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch the login action with the entered credentials', () => {
    component.form.setValue({
      email: 'customer@example.com',
      password: 'secure-password',
    });

    component.submit();

    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({
        email: 'customer@example.com',
        password: 'secure-password',
      }),
    );
  });
});
