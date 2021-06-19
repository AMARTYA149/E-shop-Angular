import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private userSignupUrl = 'http://localhost/api/users/signup';

  signup(user: User) {
    return this.http.post(this.userSignupUrl, user);
  }
}
