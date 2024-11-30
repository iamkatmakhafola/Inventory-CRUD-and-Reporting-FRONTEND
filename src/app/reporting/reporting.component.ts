import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../services/reporting.service';
import { ReportDataViewModel } from '../shared/report-data-view-model';
import { MaterialModule } from '../shared/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseChartDirective } from 'ng2-charts';
import { ReportProductTypesComponent } from './report-product-types.component';
import { ReportBrandsComponent } from './report-brands.component';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [MaterialModule, CommonModule, BaseChartDirective, ReportBrandsComponent, ReportProductTypesComponent],
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
  constructor(private reportingService: ReportingService, private snackBar: MatSnackBar) { }

  ChartData:ReportDataViewModel = new ReportDataViewModel();
  
  ngOnInit(): void {
    this.reportingService.getReportData().subscribe(
      { 
        next: (data) => {
          this.ChartData = data;
        }, 
        error: (error) => { 
          this.snackBar.open(error.error, 'error', { duration: 2000 });
        } 
      });
  }
}
