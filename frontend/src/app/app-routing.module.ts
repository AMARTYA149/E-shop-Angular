import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/shared/auth-guard/admin-auth-guard.service';
import { UserAuthGuardService } from 'src/app/shared/auth-guard/user-auth-guard.service';
import { AdminCustomersComponent } from 'src/app/admin/components/admin/admin-customers/admin-customers.component';
import { AdminDashboardComponent } from 'src/app/admin/components/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from 'src/app/admin/components/admin/admin-home/admin-home.component';
import { AdminNewProductComponent } from 'src/app/admin/components/admin/admin-new-product/admin-new-product.component';
import { AdminOrdersComponent } from 'src/app/admin/components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'src/app/admin/components/admin/admin-products/admin-products.component';
import { CartComponent } from 'src/app/user/components/cart/cart.component';
import { HomeComponent } from 'src/app/core/components/home/home.component';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { SignupComponent } from 'src/app/core/components/signup/signup.component';
import { StoreComponent } from 'src/app/user/components/store/store.component';
import { UserOrdersComponent } from 'src/app/user/components/user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserAuthGuardService]

  },
  {
    path: 'orders',
    component: UserOrdersComponent,
    canActivate: [UserAuthGuardService]

  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [UserAuthGuardService]

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [UserAuthGuardService, AdminAuthGuardService],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
      },
      {
        path: 'products',
        component: AdminProductsComponent,
      },
      {
        path: 'new-product',
        component: AdminNewProductComponent,
      },
      {
        path: 'customers',
        component: AdminCustomersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
