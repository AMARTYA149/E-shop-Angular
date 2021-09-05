import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.collectAllProducts();
  }

  collectAllProducts() {
    this._productService.getAllProducts({}).subscribe({
      next: (res) => {
        this.products = res;
      },
    });
  }
}
