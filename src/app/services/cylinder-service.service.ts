import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Cylinder } from '../models/cylinder.model';
import { Requirement } from '../models/requirement.model';

@Injectable()
export class CylinderService {

  apiCallEvent: EventEmitter<any> = new EventEmitter();

  private cylinderSubject: BehaviorSubject<Cylinder>;
  public cylinder: Observable<Cylinder>;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.cylinderSubject = new BehaviorSubject<Cylinder>(new Cylinder);
    this.cylinder = this.cylinderSubject.asObservable();
  }

  public get cylinderValue(): Cylinder {
    return this.cylinderSubject.value;
  }

  public addCylinder(cylinder : Cylinder) {
    return this.http.post(`${environment.apiUrl}/cylinder/`, cylinder);
  }

  getRequirement(requirementId: String) {
    return this.http.get<Requirement>(`${environment.apiUrl}/requirement/id/${requirementId}`);
  }

  getCylinders(query: String) {
    return this.http.get<Cylinder[]>(`${environment.apiUrl}/cylinder/identifier/${query}`);
  }

  fulfillRequirement(requirementId: String, cylinder: Cylinder) {
    return this.http.post<Requirement>(`${environment.apiUrl}/requirement/${requirementId}`, cylinder);
  }
}
