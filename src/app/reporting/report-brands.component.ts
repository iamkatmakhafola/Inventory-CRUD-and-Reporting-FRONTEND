import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportingService } from '../services/reporting.service';
import { MaterialModule } from '../shared/material.module';

@Component({
  selector: 'app-report-brands',
  standalone: true,
  imports: [MaterialModule,BaseChartDirective],
  templateUrl: './report-brands.component.html',
  styleUrl: './report-brands.component.scss'
})
export class ReportBrandsComponent {
  constructor(private reportingService: ReportingService, private snackBar: MatSnackBar) { }

  @ViewChild(BaseChartDirective) baseChart!: BaseChartDirective;

    public barChartLegend = true;
    public barChartOptions: ChartConfiguration<'bar'>['options'] = {
      responsive: false,
    };

    public barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: [ { data: [ ], label: 'Brands' }]
    };

    ngOnInit(): void {
      this.reportingService.getReportData().subscribe(
        { 
          next: (data) => {
            if (!data || !data.ProductCountByBrand) {
              console.error('Data or ProductCountByBrand is undefined:', data);
              return;
            }

              let labels = [] as string[];
              let data1 = [] as number[];
              data.ProductCountByBrand.forEach(element => {
                labels.push(element.label);
                data1.push(element.data);
              });
              console.log(labels)
              console.log(data)
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
