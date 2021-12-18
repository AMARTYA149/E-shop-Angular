import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  categories: Category[] = [];
  min: number[] = [];
  max: any[] = [];
  category = '';

  constructor(
    private _categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    Array(10)
      .fill('')
      .forEach((e, index) => {
        this.min.push((index + 1) * 100);
      });

    this.collectAllCategory();
  }

  setMaxvalue(minPrice: number) {
    this.max = [];
    Array(10)
      .fill('')
      .forEach((e, index) => {
        this.max.push(+minPrice + (index + 1) * 100);
      });

    this.max.push(this.max[this.max.length - 1] + '+');
  }

  collectAllCategory() {
    this._categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      },
    });
  }

  categorySelected(category_id: string) {
    this.category = category_id;
    this.router.navigate([''], {
      queryParams: {
        category: category_id,
      },
    });
  }

  filter(minValue, maxValue) {
    let queryParams = {
      category: this.category,
    };
    if (!isNaN(minValue)) {
      queryParams['min'] = minValue;
    }
    if (!isNaN(maxValue)) {
      queryParams['max'] = maxValue;
    }

    this.router.navigate([''], { queryParams });
  }
}
