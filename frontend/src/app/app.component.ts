import { Component } from '@angular/core';
import { ProgressService } from 'src/app/shared/services/progress/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mode = 'indeterminate';
  color = 'primary';
  title = 'E-shop';
  value = 0;

  constructor(private loader: ProgressService) {
    this.loader.loaderSubject.subscribe((res) => {
      this.mode = res ? 'indeterminate' : 'determinate';
    });
  }
}
