import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = {};

  constructor() {
    if (!this.isCartExist()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  isCartExist() {
    if (localStorage.getItem('cart')) {
      return true;
    } else {
      return false;
    }
  }

  addToCart(product: Product) {
    let quantity = this.cart[product._id];
    if (quantity) {
      this.cart[product._id] = +quantity + 1;
    } else {
      this.cart[product._id] = 1;
    }
    // localStorage.setItem();

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(product: Product) {}
}
