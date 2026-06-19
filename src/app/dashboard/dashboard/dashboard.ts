import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as UserActions from '../store/user.actions';
import { selectLoading, selectUser } from '../store/user.selectors';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './dashboard.html',
})
export class Dashboard {
  users$!: Observable<any>;
  loading$!: Observable<any>;
  constructor(private store: Store) {
    this.users$ = this.store.select(selectUser);
    this.loading$ = this.store.select(selectLoading);
  }
  loadUserList() {
    this.store.dispatch(UserActions.loadUser());
  }
  ngOnInit() {}
}
