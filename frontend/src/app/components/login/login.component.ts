import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: HTMLFormElement;
  error: string;
  success: string;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  login(event: Event) {
    event.preventDefault();
    this.form = <HTMLFormElement>event.target;
    this.readFormValues();
  }

  readFormValues() {
    let email = (<HTMLFormElement>this.form.elements.namedItem('email')).value;
    let password = (<HTMLFormElement>this.form.elements.namedItem('password'))
      .value;

    let credentials = {
      email,
      password,
    };

    console.log(credentials);

    this.userService.login(credentials).subscribe({
      next: (res) => {
        console.log(res);
        this.error = undefined;
        this.success = res.message;
      },
      error: (errResp: HttpErrorResponse) => {
        console.log(errResp.error);
        this.success = undefined;
        this.error = errResp.error.error.message;
      },
    });
  }
}
