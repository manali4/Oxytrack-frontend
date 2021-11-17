import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Requirement } from '../models/requirement.model';
import { PatientService } from '../services/patient-service.service';

@Component({
  selector: 'app-view-requirements',
  templateUrl: './view-requirements.component.html',
  styleUrls: ['./view-requirements.component.scss']
})
export class ViewRequirementsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'patient', 'requiredAt', 'status', 'type'];
  dataSource: MatTableDataSource<Requirement>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private patientService: PatientService, private router: Router) { }


  ngOnInit() {
    this.patientService.fetchRequirements().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  fulfillRequirement(id: Number) {
    this.router.navigate([`/view/requirement/${id}`]);
  }
}