import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user.model';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  implements OnInit {

  isLinear = false;

  uploadMessage: string = 'Choose Avatar';
  signupForm: FormGroup;
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
  get f() { return this.signupForm.controls; }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.user.role = "VOLUNTEER";

    this.userService.signup(this.user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.userService.login(this.user)
            .pipe(first())
            .subscribe( {
            next: () => {
              // get return url from route parameters or default to '/'
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigate([returnUrl]);
            },
              error: (error) => {
                if(error == 'Access Denied') {
                  this.error = 'Incorrect username or password';
                }
                else {
                  this.error = 'Incorrect OTP. Ask admin for OTP.';
                }
              }
          })
        },
        error: (error) => {
          this.error = "Incorrect OTP. Ask admin for OTP."
        }
      });
      this.loading = false;
  }



  req = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

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

  getNameErrorMessage() {
    if (this.req.hasError('required')) {
      return 'Please enter your name!';
    }
    return this.req.hasError('password') ? 'Something wrong with your name.' : '';
  }

  getEmailErrorMessage() {
    if(this.email.hasError('required')) {
      return 'Please enter your email!';
    }
    return this.email.hasError('email') ? 'Please enter a valid email.' : '';
  }

  getContactErrorMessage() {
    if(this.email.hasError('required')) {
      return 'Please enter your phone number!';
    }
    return this.email.hasError('contact') ? 'Please enter a valid phone number.' : '';
  }
}
