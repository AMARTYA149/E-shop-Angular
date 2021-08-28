import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  numberOfItems: number = 0;
  isLoggedIn = false;
  isAdminUrl = false;
  isAdmin$;
  constructor(
    private _cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {
    router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          let url = (<NavigationStart>event).url;
          this.isAdminUrl = url.includes('admin');
        }
      },
    });
  }

  ngOnInit(): void {
    this._cartService.cartObservable.subscribe({
      next: (cart) => {
        this.numberOfItems = Object.keys(cart).length;
      },
    });

    this.userService.loginObservable.subscribe({
      next: () => {
        let token = this.userService.getToken();
        if (token != '') {
          this.checkAdmin();
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
    });
  }

  checkAdmin() {
    //check if user is admin or not
    this.isAdmin$ = this.userService.isAdmin();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
