import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  
  form!:FormGroup;  
  constructor(private store: Store, private fb:FormBuilder){

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  
  submit() {
    if (this.form.valid) {
      const {email, password} = this.form.value;
     this.store.dispatch(AuthActions.login({ email, password }));
    }
  }
}
