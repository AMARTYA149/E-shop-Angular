import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart/cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent implements OnInit {
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

  minusQuantity() {
    this.quantity--;
    this._cartService.setQuantity(this.product, this.quantity);
  }

  plusQuantity() {
    this.quantity++;
    this._cartService.setQuantity(this.product, this.quantity);
  }
}
