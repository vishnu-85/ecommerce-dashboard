import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as AuthActions from '../../features/auth/store/auth.actions'

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  standalone: true,
  template: `<aside>
    <div class="logo-area">
      <div class="logo-img"><img src="../../../assets/logo_ai.png" alt=""></div>
    </div> 
    <nav class="history">
      <a routerLink="dashboard"><div class="nav-item">Dashboard</div></a>
      <a routerLink="products"><div class="nav-item">Products</div></a>
      <a routerLink="orders"><div class="nav-item">Orders</div></a>
      <a routerLink="category"><div class="nav-item">Category</div></a>
      <a routerLink="customers"><div class="nav-item">Customers</div></a>
    </nav>
  </aside>
`
})
export class SidebarComponent {
  
  constructor(
    private store: Store,
  ) {
    
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(){
      
  }

}
