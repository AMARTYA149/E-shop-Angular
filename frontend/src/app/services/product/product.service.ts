import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllProductUrl = 'http://localhost/api/products';
  constructor(private http: HttpClient, private _userService: UserService) {}

  getAllProducts() {
    return this.http
      .get(this.getAllProductUrl, {
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

  getProductById(id: string) {
    return this.http
      .get(`${this.getAllProductUrl}/${id}`, {
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
}