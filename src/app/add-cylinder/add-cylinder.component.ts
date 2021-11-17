import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Cylinder } from '../models/cylinder.model';
import { CylinderService } from '../services/cylinder-service.service';

@Component({
  selector: 'app-add-cylinder',
  templateUrl: './add-cylinder.component.html',
  styleUrls: ['./add-cylinder.component.scss']
})
export class AddCylinderComponent implements OnInit {

  loading: Boolean = false;
  submitted: Boolean = false;
  error: String;
  fg_AddCylinder: FormGroup;
  cylinder: Cylinder = new Cylinder();


  foods: any[] = [
    {value: 'AVAILABLE', viewValue: 'Available'},
    {value: 'EMPTY', viewValue: 'Empty'},
    {value: 'ALLOTED', viewValue: 'Alloted'}
  ];

  constructor(private route: ActivatedRoute, private router: Router, private cylinderService: CylinderService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fg_AddCylinder = this.formBuilder.group({
      identifier: ['', Validators.required],
      currentCapacity: ['', Validators.required],
      totalCapacity: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.cylinderService.addCylinder(this.cylinder)
      .pipe(first())
      .subscribe({
        next: (response) => {
          let responseCylinder: any = response;
          this.openSnackBar(responseCylinder.identifier + ` added!`, "Close");
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
