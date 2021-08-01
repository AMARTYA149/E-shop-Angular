import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (paramMap: ParamMap) => {
        let categoryId = paramMap.get('category');
        let min = paramMap.get('min');
        let max = paramMap.get('max');

        this.collectProducts({ category: categoryId, min, max });
      },
    });
  }

  collectProducts(params) {
    this._productService.getAllProducts(params).subscribe({
      next: (product) => {
        this.products = product;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
