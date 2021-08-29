import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.scss'],
})
export class AdminNewProductComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  saveCategory(form: FormGroup) {}

  saveProduct(form: FormGroup) {}
}
