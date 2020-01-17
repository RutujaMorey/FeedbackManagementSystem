import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-feedback-management';
  userName = '';
  showNavBar: boolean;
  ngOnInit() {
    this.userName = localStorage.getItem('Role');
    this.showNavBars();


  }
  constructor() {

  }

  showNavBars() {
    Observable.of(localStorage.getItem('Role')).subscribe((data) => {
    });
    if (this.userName === null) {
      this.showNavBar = false;
    } else {
      this.showNavBar = true;
    }
  }
  onSignOut() {
    localStorage.removeItem('Role');
    this.userName = null;
    if (this.userName === null) {
      this.showNavBar = false;
    } else {
      this.showNavBar = true;
    }
  }

}





