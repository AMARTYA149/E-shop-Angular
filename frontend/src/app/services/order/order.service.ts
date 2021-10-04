import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderURL = '/api/orders';

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  placeOrder(orderInfo: OrderInfo) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });

    return this.httpClient.post(this.orderURL, orderInfo, { headers });
  }

  changeStatus(data: {status: string}, orderId: string) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });

    return this.httpClient.patch(this.orderURL + '/' + orderId, data, { headers });
  }

  getUserOrders(all?: boolean) {
    let url = this.orderURL;
    if (all) {
      url = url + '?all=true';
    }

    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });

    return this.httpClient.get(url, { headers }).pipe(
      map((result: { count: number; orders: Order[] }) => {
        return result.orders;
      })
    );
  }

  getAdminOrders() {
    return this.getUserOrders(true);
  }
}

export interface ProductInfo {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  address: string;
  products: ProductInfo[];
}
