import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart;
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private _cartService: CartService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.subscribeCart();
  }

  subscribeCart() {
    let total;
    this._cartService.cartObservable.subscribe({
      next: (cart) => {
        let observables = [];
        total = 0;
        if (Object.keys(cart).length == 0) {
          this.cartItems = [];
        }
        for (let id in cart) {
          observables.push(
            this._productService.getProductById(id).pipe(
              map((product) => {
                total += product.price * cart[id];
                let item: CartItem = {
                  product: product,
                  quantity: cart[id],
                };
                return item;
              })
            )
          );
        }

        forkJoin(observables).subscribe({
          next: (cartItems: CartItem[]) => {
            this.cartItems = cartItems;
            this.total = total;
          },
        });
      },
    });
  }
}
