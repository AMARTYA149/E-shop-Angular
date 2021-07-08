import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  categories: Category[] = [];
  constructor(private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this.collectAllCategory();
  }

  collectAllCategory() {
    this._categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log(this.categories);
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      },
    });
  }

  categorySelected(category_id: string) {
    console.log(category_id);
  }
}
