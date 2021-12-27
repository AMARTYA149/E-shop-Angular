import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this.collectOrders();
  }

  collectOrders() {
    this._orderService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        console.log(this.orders);
      },
    });
  }
}
