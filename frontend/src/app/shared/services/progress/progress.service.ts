import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private _loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public get loaderSubject() {
    return this._loaderSubject;
  }

  hide() {
    this.loaderSubject.next(false);
  }

  show() {
    this.loaderSubject.next(true);
  }
}
