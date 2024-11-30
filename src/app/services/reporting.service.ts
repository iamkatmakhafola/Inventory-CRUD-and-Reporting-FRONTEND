import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportDataViewModel } from '../shared/report-data-view-model';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private http : HttpClient) { }
  endPoint: string = "http://localhost:5240/api/";

  getReportData(){
    let appheaders = this.getHeaderConfigurations();
    return this.http.get<ReportDataViewModel>(`${this.endPoint}Report/GetReportData`, { headers: appheaders});
  }

  private getHeaderConfigurations()
    {
        return new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
               'Access-Control-Allow-Origin': '*'
        });
    }
}
