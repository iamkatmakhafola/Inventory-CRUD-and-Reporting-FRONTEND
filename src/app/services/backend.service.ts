import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../shared/register-user';
import { LoginUser } from '../shared/login-user';
import { User } from '../shared/user';
import { Observable, map } from 'rxjs';
import { ReportDataViewModel } from '../shared/report-data-view-model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}
  endPoint: string = "http://localhost:5240/api/";

  RegisterUser(registerUser: RegisterUser) {
    return this.http.post(`${this.endPoint}Authentication/Register`, registerUser, this.httpOptions);
  }

  LoginUser(loginUser: LoginUser): Observable<User> {
    return this.http.post<User>(`${this.endPoint}Authentication/Login`, loginUser, this.httpOptions);
  }

  getProducts() {
    return this.http.get(`${this.endPoint}Store/AllProducts`)
    .pipe(map(result => result))
  }

  addProduct(file:FormData){
    
    return this.http.post(`${this.endPoint}Store/AddProduct`, file)
  }

  getBrands(): Observable<any>
  {
    return this.http.get(`${this.endPoint}Store/Brands`)
    .pipe(map(result => result))
  }

  getProductTypes(): Observable<any>
  {
    return this.http.get(`${this.endPoint}Store/ProductTypes`)
    .pipe(map(result => result))
  }
}
