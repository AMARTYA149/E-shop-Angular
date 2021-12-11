import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from '../services/notification/notification.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private message: NotificationService,
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let header = req.headers.set('authorization', this.userService.getToken());
    let r = req.clone({
      headers: header,
    });
    return next.handle(r).pipe(
      map((result) => {
        return result;
      }),
      catchError((err: HttpErrorResponse) => {
        this.showProperMessage(err);
        return throwError(err);
      })
    );
  }

  showProperMessage(err: HttpErrorResponse) {
    if (err.url.includes('is-admin')) {
      return;
    }

    if (this.router.url.includes('login') && err.status != 401) {
      this.message.show('Invalid Email or Password!');
      return;
    }

    if (err.status == 401) {
      this.message.show('Session Expired... please login again!');
      this.userService.logout();
      this.router.navigate(['login'], {
        queryParams: {
          returnUrl: this.router.url,
        },
      });

      return;
    }
  }
}
