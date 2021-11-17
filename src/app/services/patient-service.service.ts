import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Patient } from '../models/patient.model';
import { Requirement } from '../models/requirement.model';
import { Cylinder } from '../models/cylinder.model';

@Injectable()
export class PatientService {

  apiCallEvent: EventEmitter<any> = new EventEmitter();

  private patientSubject: BehaviorSubject<Patient>;
  public patient: Observable<Patient>;
  isLoggedIn: boolean = false;
  opts = [];

  constructor(private http: HttpClient) {
    this.patientSubject = new BehaviorSubject<Patient>(new Patient);
    this.patient = this.patientSubject.asObservable();
  }

  public get patientValue(): Patient {
    return this.patientSubject.value;
  }

  public registerPatient(patient : Patient) {
    return this.http.post(`${environment.apiUrl}/patient/`, patient);
  }

  public getPatients(query: String) {
    return this.http.get<any>(`${environment.apiUrl}/patient/name/${query}`);
  }

  public addRequirementToPatient(requirement: Requirement) {
    return this.http.post(`${environment.apiUrl}/requirement/`, requirement);
  }

  fetchRequirements() {
    return this.http.get<Requirement[]>(`${environment.apiUrl}/requirement/`);
  }




}
