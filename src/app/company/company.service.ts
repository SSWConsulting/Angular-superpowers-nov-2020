import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Company } from './company';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private httpClient: HttpClient
  ) { }

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      tap(c => console.log('service has data', c)),
      catchError(this.errorHandler),
      finalize(() => console.log('COMPLETE'))
    );
  }

  deleteCompany(company: Company): Observable<Company>{
    console.log('SERVICE - delete company called', company);
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  addCompany(company: Company): Observable<Company>{
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json')})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json')})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(e: any): Observable<any> {
    console.error('service Error', e);
    return of({});
  }

}
