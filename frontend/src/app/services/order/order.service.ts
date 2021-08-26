import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderPlaceURL = 'http://localhost/api/orders';
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  placeOrder(orderInfo: OrderInfo) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });

    return this.httpClient.post(this.orderPlaceURL, orderInfo, { headers });
  }
}

interface ProductInfo {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderInfo {
  firstName: string;
  lastName: string;
  address: string;
  products: ProductInfo[];
}
