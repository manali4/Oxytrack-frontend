import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  loginEvent: EventEmitter<any> = new EventEmitter();

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  isLoggedIn: boolean = false;
  private readonly usersUrl: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.usersUrl = 'http://localhost:8080';
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, user)
      .pipe(
        map(
          response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            user = new User();
            user.token = response.jwt;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isLoggedIn = true;
            this.loginEvent.emit(this.isLoggedIn);
            return response;
          }));

  }

  logout() {
    this.isLoggedIn = false;
    this.loginEvent.emit(this.isLoggedIn);
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public signup(user: User) {
    return this.http.post(`${environment.apiUrl}/volunteer/?otp=${user.otp}`, user);
  }

  getOwnData() {
    return this.http.get<any>(`${environment.apiUrl}/volunteer/`)
      .pipe(
        map(
          response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            let user = new User();
            user = response;
            return user;
          }));
  }
}
