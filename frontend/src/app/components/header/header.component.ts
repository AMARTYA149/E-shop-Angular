import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  numberOfItems: number = 0;
  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.cartObservable.subscribe({
      next: (cart) => {
        // console.log(cart);
        this.numberOfItems = Object.keys(cart).length;
      },
    });
  }
}
