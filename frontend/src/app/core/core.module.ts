import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserModule } from '../user/user.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [CommonModule, CoreRoutingModule, UserModule],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
  ],
})
export class CoreModule {}
