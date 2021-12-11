import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private matSnackBar: MatSnackBar) {}

  show(message) {
    this.matSnackBar.open(message, ' ', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 4000,
    });
  }
}
