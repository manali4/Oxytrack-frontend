import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user.model';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    // redirect to home if already logged in
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.user = new User();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.userService.login(this.user)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          if (error = 'Access Denied') {
            this.error = 'Incorrect username or password';
          }
          else {
            this.error = 'Something went wrong';
          }
        }
      });
    this.loading = false;
  }


  req = new FormControl('', [Validators.required]);

  getUsernameErrorMessage() {
    if (this.req.hasError('required')) {
      return 'Please enter your username!';
    }
    return this.req.hasError('username') ? 'Not a valid username' : '';
  }

  getPasswordErrorMessage() {
    if (this.req.hasError('required')) {
      return 'Please enter your password!';
    }
    return this.req.hasError('password') ? 'Something wrong with your password.' : '';
  }

}
