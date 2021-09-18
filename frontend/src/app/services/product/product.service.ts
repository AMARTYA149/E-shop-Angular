import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productUrl = 'http://localhost/api/products';
  constructor(private http: HttpClient, private _userService: UserService) {}

  getAllProducts(params) {
    let query = new URLSearchParams();

    if (params['category']) {
      query.append('category', params['category']);
    }

    if (params['min']) {
      query.append('min', params['min']);
    }

    if (params['max']) {
      query.append('max', params['max']);
    }

    return this.http
      .get(`${this.productUrl}?${query.toString()}`, {
        headers: {
          authorization: this._userService.getToken(),
        },
      })
      .pipe(
        map((result: { count: number; products: Product[] }) => {
          return result.products;
        })
      );
  }

  //get product by id
  getProductById(id: string) {
    return this.http
      .get(`${this.productUrl}/${id}`, {
        headers: {
          authorization: this._userService.getToken(),
        },
      })
      .pipe(
        map((result) => {
          return <Product>result;
        })
      );
  }

  saveProduct(data: FormData) {
    return this.http
      .post(this.productUrl, data, {
        headers: {
          authorization: this._userService.getToken(),
        },
      })
      .pipe(
        map((result: { message: string; product: Product }) => {
          return <Product>result.product;
        })
      );
  }

  updateProduct(data) {
    console.log(data);
    return this.http.patch(this.productUrl, data, {
      headers: {
        authorization: this._userService.getToken(),
      },
    });
  }
}
