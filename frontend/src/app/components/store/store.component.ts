import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.collectProducts();
  }

  collectProducts() {
    this._productService.getAllProducts().subscribe({
      next: (product) => {
        this.products = product;
        console.log(this.products);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
