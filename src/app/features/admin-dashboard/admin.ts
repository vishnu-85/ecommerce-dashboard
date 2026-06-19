import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { ChatService } from '../../core/services/chat-bot.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectUser } from './store/user.selectors';
import * as AuthActions from '../auth/store/auth.actions'

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './admin.html'
})
export class AdminComponent {
  user$: any;
  user:any;
  sub= new Subscription();
  constructor(
    private store: Store,
    private storageService: StorageService,
    private chatService: ChatService,
  ) {
    this.user$ = this.store.select(selectUser);
    this.sub.add(
      this.user$.subscribe((data: any) => {
        this.user = data;
      })
    )
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }

}
