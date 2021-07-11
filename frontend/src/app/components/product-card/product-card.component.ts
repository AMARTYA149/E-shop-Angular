import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product')
  product: Product;
  quantity: number = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    console.log(this.product);
    this._cartService.cartObservable.subscribe({
      next: (cart) => {
        this.quantity = this._cartService.getQuantity(this.product);
      },
    });
  }

  addToCart() {
    console.log(this.product);
    this._cartService.addToCart(this.product);
  }

  minusQuantity() {
    this.quantity--;
    this._cartService.setQuantity(this.product, this.quantity);
  }

  plusQuantity() {
    this.quantity++;
    this._cartService.setQuantity(this.product, this.quantity);
  }
}
