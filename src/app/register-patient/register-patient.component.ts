import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient-service.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {

  loading: Boolean = false;
  submitted: Boolean = false;
  error: String;
  fg_RegisterPatient: FormGroup;
  patient: Patient = new Patient();

  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fg_RegisterPatient = this.formBuilder.group({
      address: ['', Validators.required],
      patientName: ['', Validators.required],
      patientContact: ['', Validators.required],
      location: ['', Validators.required],
      age: ['', Validators.required],
      relativeName: ['', Validators.required],
      alternateContact1: [''],
      alternateContact2: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.patientService.registerPatient(this.patient)
      .pipe(first())
      .subscribe({
        next: (response) => {
          let responsePatient: any = response;
          this.openSnackBar(responsePatient.patientName + ` registered!`, "Close");
        },
        error: error => {
          if(error == 'Access Denied') {
            this.error = 'Incorrect username or password';
          }
          else {
            this.error = 'Something went wrong';
          }
          this.loading = false;
        }
      });
      this.loading = false;
  }


  getErrorMessage() {
      return 'This field is required';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
