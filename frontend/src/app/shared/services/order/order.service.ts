import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order';
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
   

    return this.httpClient.post(this.orderURL, orderInfo);
  }

  changeStatus(data: {status: string}, orderId: string) {
   

    return this.httpClient.patch(this.orderURL + '/' + orderId, data);
  }

  getUserOrders(all?: boolean) {
    let url = this.orderURL;
    if (all) {
      url = url + '?all=true';
    }

   

    return this.httpClient.get(url).pipe(
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
