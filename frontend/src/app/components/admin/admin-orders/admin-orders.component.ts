import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  modelRef: BsModalRef;
  selectedOrder: Order;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.collectOrders();
  }

  collectOrders() {
    this.orders$ = this.orderService.getAdminOrders();

    this.orders$.toPromise().then((r) => {
      console.log(r);
    });
  }

  changeStatus(status: string, order: Order) {
    this.orderService.changeStatus({ status }, order._id).subscribe({
      next: (res) => {
        console.log(res);
        order.status = status;
      },
    });
  }

  orderDetails(order: Order, table) {
    this.selectedOrder = order;
    this.modelRef = this.modalService.show(table);
  }

  close() {
    this.modelRef.hide();
  }
}
