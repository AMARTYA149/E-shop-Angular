import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: HTMLFormElement;
  error: string;
  success: string;
  returnUrl: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: ParamMap) => {
      this.returnUrl = params['returnUrl'];
    })
  }

  navigateToHomepage() {
    let url = this.returnUrl ? this.returnUrl : '/';
    this.router.navigateByUrl(url);
  }

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

    this.userService.login(credentials).subscribe({
      next: (res) => {
        this.error = undefined;
        this.success = res.message;
        this.navigateToHomepage();
      },
      error: (errResp: HttpErrorResponse) => {
        console.log(errResp.error);
        this.success = undefined;
        this.error = errResp.error.error.message;
      },
    });
  }
}
