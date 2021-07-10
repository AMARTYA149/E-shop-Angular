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

  constructor(private _cartService: CartService) {
    console.log(this.product);
  }

  ngOnInit(): void {}

  addToCart() {
    console.log(this.product);
    this._cartService.addToCart(this.product);
  }
}
