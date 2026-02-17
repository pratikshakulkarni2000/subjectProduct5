import { Component, inject } from '@angular/core';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'subjectProduct5';

   isLoading : boolean = false

  private _spinner = inject(SpinnerService)

  ngOnInit(): void {
    this._spinner.spinnerObs$.subscribe(res => {
      this.isLoading = res
    })
  }

}
