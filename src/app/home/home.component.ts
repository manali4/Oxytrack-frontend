import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user-service.service';
import { User } from '../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loggedIn: boolean = true;
  userData: User;

  constructor(public userService: UserService, public router: Router) {
    this.userService.loginEvent.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.userService.getOwnData().pipe(first()).subscribe({
          next: response => {
            this.userData = response;
            console.log(this.userData);
          },
          error: error => {
            console.log(error);
          }
        });
      }
    });
  }

  ngOnInit() {
    if (this.loggedIn) {
      this.userService.getOwnData().pipe(first()).subscribe({
        next: response => {
          this.userData = response;
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  goto(path: String): void {
    this.router.navigate([path]);
  }
}
