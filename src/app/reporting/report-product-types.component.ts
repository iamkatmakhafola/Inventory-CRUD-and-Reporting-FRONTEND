import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportingService } from '../services/reporting.service';

@Component({
  selector: 'app-report-product-types',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-product-types.component.html',
  styleUrl: './report-product-types.component.scss'
})
export class ReportProductTypesComponent {
  constructor(private reportingService: ReportingService, private snackBar: MatSnackBar) {}

  @ViewChild(BaseChartDirective) baseChart!: BaseChartDirective;

  public barChartLegend = true;
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [ { data: [ ], label: 'Product Types' }]
  };

  ngOnInit(): void {
    this.reportingService.getReportData().subscribe(
    { 
      next: (data) => {
        if (!data || !data.ProductCountByProductType) {
          console.error('Data or ProductCountByProductType is undefined:', data);
          return;
        }

          let labels = [] as string[];
          let data1 = [] as number[];
          data.ProductCountByProductType.forEach(element => {
            labels.push(element.label);
            data1.push(element.data);
          });
          
          console.log(labels)
          console.log(data1)
          this.barChartData.labels = labels;
          this.barChartData.datasets[0].data = data1;
          this.baseChart.update();
      }, 
      error: (error) => { 
        this.snackBar.open(error.error, 'error', { duration: 2000 });
      } 
    });
  }
}
