import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  categorySubscription: Subscription;
  selectedProduct: Product;
  modalRef: BsModalRef;
  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.collectAllProducts();
    this.collectAllCategories();
  }

  collectAllProducts() {
    this._productService.getAllProducts({}).subscribe({
      next: (res) => {
        this.products = res;
      },
    });
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

  // update product
  updateProduct(productForm: HTMLFormElement) {
    let name = (<HTMLInputElement>productForm.elements.namedItem('name')).value;
    let price = (<HTMLInputElement>productForm.elements.namedItem('price'))
      .value;
    let category = (<HTMLSelectElement>(
      productForm.elements.namedItem('category')
    )).value;

    let values = {
      name,
      price,
      category,
    };

    console.log(values);

    this._productService.updateProduct(values).subscribe(
      (result) => {
        //     console.log("success")
        //     this.selectedProduct.name = name;
        //     this.selectedProduct.price = +price;
        //     this.categories.find((el, index, arr) => {
        //       if(el._id == category){
        //         this.selectedProduct.category = el;
        //       }
        //     })
        //     console.log(this.selectedProduct);
        this.modalRef.hide();
      },
      (err) => {
        console.log(err);
        this.modalRef.hide();

      }
    );
  }

  openModal(formTemplate, product: Product) {
    this.modalRef = this.modalService.show(formTemplate);
    this.selectedProduct = product;
  }
}
