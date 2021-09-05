import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.scss'],
})
export class AdminNewProductComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categorySubscription: Subscription;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.collectAllCategories();
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

  collectAllCategories() {
    this.categorySubscription = this._categoryService
      .getAllCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
      });
  }

  saveCategory(categoryForm: HTMLFormElement) {
    let title = (<HTMLInputElement>categoryForm.elements.namedItem('title'))
      .value;
    // console.log(title);
    this._categoryService.saveCategory({ title: title }).subscribe({
      next: (res) => {
        this.categories.push(res);
        categoryForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        if (err.message.includes('Auth Failed')) {
          //logout
        }
        // console.log(err);
      },
    });
  }

  saveProduct(productForm: HTMLFormElement) {
    let name = (<HTMLInputElement>productForm.elements.namedItem('name')).value;
    let price = (<HTMLInputElement>productForm.elements.namedItem('price'))
      .value;
    let category = (<HTMLSelectElement>(
      productForm.elements.namedItem('category')
    )).value;
    let productImage = (<HTMLInputElement>(
      productForm.elements.namedItem('productImage')
    )).files[0];

    let values = {
      name,
      price,
      category,
      productImage,
    };

    let data = new FormData();

    data.append('name', name);
    data.append('price', price);
    data.append('category', category);
    data.append('productImage', productImage);

    this._productService.saveProduct(data).subscribe({
      next: (res) => {
        productForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        if (err.message.includes('Auth Failed')) {
          //logout
        }
      },
    });

    console.log(values);
  }
}
