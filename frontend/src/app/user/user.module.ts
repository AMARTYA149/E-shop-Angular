import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { StoreComponent } from './components/store/store.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    StoreComponent,
    FilterComponent,
    ProductCardComponent,
    CartComponent,
    UserOrdersComponent,
    ProductQuantityComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
  exports: [FilterComponent, StoreComponent],
})
export class UserModule {}
