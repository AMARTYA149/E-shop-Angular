import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSignupUrl = '/api/users/signup';
  private getAllUsersURL = '/api/users';
  private userLoginUrl = '/api/users/login';
  private isAdminUrl = '/api/users/is-admin';

  private _loginObservable: BehaviorSubject<Object>;

  constructor(private http: HttpClient) {
    this._loginObservable = new BehaviorSubject({});
  }

  public get loginObservable() {
    return this._loginObservable;
  }

  private saveTokenToLocalStorage(token: string) {
    localStorage.setItem('token', 'Bearer ' + token);
  }

  logout() {
    localStorage.removeItem('token');
    this._loginObservable.next({});
  }

  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  isLoggedIn() {
    if (this.getToken() != '') {
      return true;
    }

    return false;
  }

  isAdmin() {
    let headers = new HttpHeaders({
      authorization: this.getToken(),
    });
    return this.http.get(this.isAdminUrl).pipe(
      map((result) => {
        return <boolean>result;
      })
    );
  }

  signup(user: User) {
    return this.http.post(this.userSignupUrl, user).pipe(
      map((result) => {
        return <{ message: string }>result;
      })
    );
  }

  getAllUsers() {
    return this.http.get(this.getAllUsersURL).pipe(
      map((result: { users: User[] }) => {
        return result.users;
      })
    );
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(this.userLoginUrl, credentials).pipe(
      map((result: loginResponse) => {
        this.saveTokenToLocalStorage(result.token);
        this._loginObservable.next({});
        return result;
      })
    );
  }
}

interface loginResponse {
  token: string;
  message: string;
}
