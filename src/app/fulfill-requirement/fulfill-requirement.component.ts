import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first, retry } from 'rxjs/operators';
import { Cylinder } from '../models/cylinder.model';
import { Patient } from '../models/patient.model';
import { Requirement } from '../models/requirement.model';
import { CylinderService } from '../services/cylinder-service.service';
import { PatientService } from '../services/patient-service.service';

@Component({
  selector: 'app-fulfill-requirement',
  templateUrl: './fulfill-requirement.component.html',
  styleUrls: ['./fulfill-requirement.component.scss']
})
export class FulfillRequirementComponent implements OnInit {

  loading: Boolean = false;
  patients: any[];
  patient: Patient;
  cylinder: Cylinder;
  cylinders: Cylinder[];
  types: any[];
  error: any;
  id: String;
  requirement: Requirement;


  constructor(private activatedRoute: ActivatedRoute, private cylinderService: CylinderService, private snackBar: MatSnackBar) {
    this.requirement = new Requirement;
    this.patient = new Patient;
    this.cylinder = new Cylinder;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cylinderService.getRequirement(this.id)
      .pipe(first())
      .subscribe({
        next: (requirement) => {
          this.requirement = requirement;
        },
        error: error => {
          console.log(error);
        }
      });
  }

  onSubmit() {
    if(this.cylinder.identifier === undefined) {
      this.openSnackBar("Please choose a cylinder from the list", "OK");
      return;
    }
    this.cylinderService.fulfillRequirement(this.id, this.cylinder)
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.openSnackBar("Requirement fulfilled Successfully", "OK");
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public onSearchChange(query: String) {
    this.loading = true;
    if (query) {
      this.cylinderService.getCylinders(query)
        .pipe(first())
        .subscribe({
          next: (response) => {
            let tempCylinders: Cylinder[] = [];
            tempCylinders = response;
            this.cylinders = [];
            tempCylinders.forEach(cylinder => {
              this.cylinders.push(cylinder);
            });
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
    this.loading = false;
  }

  displayFn(cylidner) {
    if (cylidner != null)
      return cylidner.identifier;
  }
  getErrorMessage(field: String) {
    return `${field} is invalid.`;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
