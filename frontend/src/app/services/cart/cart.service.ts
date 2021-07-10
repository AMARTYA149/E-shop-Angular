import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = {};
  private _cartObservable: BehaviorSubject<Object>;

  constructor() {
    if (!this.isCartExist()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    this.readCartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  readCartDataFromLocalStorage() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  get cartObservable() {
    return this._cartObservable;
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
    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(product: Product) {}
}
