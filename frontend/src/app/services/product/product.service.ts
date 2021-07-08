import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllProduct = 'http://localhost/api/products';
  constructor(private http: HttpClient, private _userService: UserService) {}

  getAllProducts() {
    return this.http.get(this.getAllProduct, {
      headers: {
        authorization: this._userService.getToken(),
      },
    });
  }
}
