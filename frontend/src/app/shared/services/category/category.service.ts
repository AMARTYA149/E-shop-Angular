import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryUrl = '/api/categories';
  constructor(private http: HttpClient, private userService: UserService) {}

  getAllCategories() {
    return this.http.get(this.categoryUrl).pipe(
      map((result) => {
        return <Category[]>result['categories'];
      })
    );
  }

  saveCategory(data: { title: string }) {
   

    return this.http.post(this.categoryUrl, data).pipe(
      map((result: { message: string; category: Category }) => {
        return result.category;
      })
    );
  }
}
