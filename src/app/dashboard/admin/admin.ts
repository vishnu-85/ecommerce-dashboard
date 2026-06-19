import { Component } from '@angular/core';
import { selectUser } from '../../auth/store/auth.selectors';
import * as AuthActions from '../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { ChatService } from '../../shared/services/chat-bot.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
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
