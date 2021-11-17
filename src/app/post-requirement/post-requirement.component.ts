import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Patient } from '../models/patient.model';
import { Requirement } from '../models/requirement.model';
import { PatientService } from '../services/patient-service.service';

@Component({
  selector: 'app-post-requirement',
  templateUrl: './post-requirement.component.html',
  styleUrls: ['./post-requirement.component.scss']
})
export class PostRequirementComponent implements OnInit {

  loading: Boolean = false;
  error: any;
  myControl = new FormControl();
  patients: Patient[] = [];
  filteredOptions: Observable<any[]>;

  types: any[] = [
    {value: 'NEW', viewValue: 'New Cylinder'},
    {value: 'REFILL', viewValue: 'Refill Existing Cylinder'}
  ];

  requirement: Requirement = new Requirement();

  constructor(private patientService: PatientService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.loading = true;
    this.requirement.status = false;
    this.patientService.addRequirementToPatient(this.requirement)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.openSnackBar("Requirement Added Successfully.", "OK");
        },
        error: error => {
          this.openSnackBar("Something went wrong.", "OK");
        }
      });
    this.loading = false;
  }

  public getErrorMessage(fieldName: String): String {
    return `${fieldName} is required.`;
  }

  public onSearchChange(query: String) {
    if (query) {
      this.loading = true;
      this.patientService.getPatients(query)
        .pipe(first())
        .subscribe({
          next: (response) => {
            let tempPatients: Patient[] = [];
            tempPatients = response;
            this.patients = [];
            tempPatients.forEach(patient => {
              this.patients.push(patient);
            });
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
    this.loading = false;
  }

  displayFn(patient) {
    if (patient != null)
      return patient.patientName;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
