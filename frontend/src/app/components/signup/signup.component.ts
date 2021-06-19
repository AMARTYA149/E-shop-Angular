import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService) {}
  error: string;
  success: string;

  ngOnInit(): void {}

  signup(event: Event): void {
    event.preventDefault();

    let form = <HTMLFormElement>event.target;
    let name = (<HTMLInputElement>form.elements.namedItem('name')).value;
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value;
    let password = (<HTMLInputElement>form.elements.namedItem('password'))
      .value;
    let phone = (<HTMLInputElement>form.elements.namedItem('phone')).value;

    let user: User = {
      name,
      email,
      password,
      phone,
    };

    console.log(user);

    this.userService.signup(user).subscribe({
      next: (result: { message: string }) => {
        // console.log(result);
        this.success = result.message;
        this.error = undefined;
        form.reset();
      },
      error: (errResp: HttpErrorResponse) => {
        // console.log(errResp);
        this.error = errResp.error.error.message;
        this.success = undefined;
      },
    });
  }
}
