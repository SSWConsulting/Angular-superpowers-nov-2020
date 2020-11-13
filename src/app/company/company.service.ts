import { HttpClient } from '@angular/common/http';
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

  errorHandler(e: any): Observable<any> {
    console.error('service Error', e);
    return of({});
  }

}
