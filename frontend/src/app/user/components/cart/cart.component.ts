import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import {
  OrderInfo,
  OrderService,
  ProductInfo,
} from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart;
  cartItems: CartItem[] = [];
  total: number = 0;
  cartSubscription: Subscription;
  modalRef: BsModalRef;

  constructor(
    private _cartService: CartService,
    private _productService: ProductService,
    private modalService: BsModalService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  subscribeCart() {
    let total;
    this.cartSubscription = this._cartService.cartObservable.subscribe({
      next: (cart) => {
        let observables = [];
        total = 0;
        if (Object.keys(cart).length == 0) {
          this.cartItems = [];
        }
        for (let id in cart) {
          observables.push(
            this._productService.getProductById(id).pipe(
              map((product) => {
                total += product.price * cart[id];
                let item: CartItem = {
                  product: product,
                  quantity: cart[id],
                };
                return item;
              })
            )
          );
        }

        forkJoin(observables).subscribe({
          next: (cartItems: CartItem[]) => {
            this.cartItems = cartItems;
            this.total = total;
          },
        });
      },
    });
  }

  // open modal
  openModal(form) {
    this.modalRef = this.modalService.show(form, {
      animated: true,
      class: 'modal-lg',
    });
  }

  // checkout
  checkOut(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    let firstName = (<HTMLInputElement>form.elements.namedItem('firstName'))
      .value;
    let lastName = (<HTMLInputElement>form.elements.namedItem('lastName'))
      .value;
    let address = (<HTMLInputElement>form.elements.namedItem('address')).value;

    let orderInfo: OrderInfo;
    let productInfos: ProductInfo[] = [];
    this.cartItems.forEach((e) => {
      productInfos.push({
        price: e.product.price,
        productId: e.product._id,
        quantity: e.quantity,
      });
    });

    orderInfo = {
      address,
      firstName,
      lastName,
      products: productInfos,
    };
    console.log({ orderInfo });

    this.orderService.placeOrder(orderInfo).subscribe({
      next: (response) => {
        this.modalRef.hide();
        this._cartService.clearCart();
        this.router.navigate(['orders']);
      },
      error: (err) => {
        console.log('err', 'Cant place order...');
      },
    });
    return false;
  }
}
