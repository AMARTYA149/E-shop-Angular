import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart/cart.service';

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
    this._cartService.cartObservable.subscribe({
      next: (cart) => {
        this.quantity = this._cartService.getQuantity(this.product);
      },
    });
  }

  addToCart() {
    this._cartService.addToCart(this.product);
  }
}
