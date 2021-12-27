import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminCustomersComponent } from 'src/app/admin/components/admin/admin-customers/admin-customers.component';
import { AdminDashboardCardComponent } from 'src/app/admin/components/admin/admin-dashboard-card/admin-dashboard-card.component';
import { AdminDashboardComponent } from 'src/app/admin/components/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from 'src/app/admin/components/admin/admin-home/admin-home.component';
import { AdminNewProductComponent } from 'src/app/admin/components/admin/admin-new-product/admin-new-product.component';
import { AdminOrdersComponent } from 'src/app/admin/components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'src/app/admin/components/admin/admin-products/admin-products.component';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { HomeComponent } from 'src/app/core/components/home/home.component';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { SignupComponent } from 'src/app/core/components/signup/signup.component';
import { HeaderInterceptorService } from 'src/app/shared/interceptor/header-interceptor.service';
import { CartComponent } from 'src/app/user/components/cart/cart.component';
import { FilterComponent } from 'src/app/user/components/filter/filter.component';
import { ProductCardComponent } from 'src/app/user/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'src/app/user/components/product-quantity/product-quantity.component';
import { StoreComponent } from 'src/app/user/components/store/store.component';
import { UserOrdersComponent } from 'src/app/user/components/user-orders/user-orders.component';
// import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StoreComponent,
    FilterComponent,
    ProductCardComponent,
    CartComponent,
    UserOrdersComponent,
    LoginComponent,
    SignupComponent,
    ProductQuantityComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminNewProductComponent,
    AdminCustomersComponent,
    AdminDashboardCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    // ChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
