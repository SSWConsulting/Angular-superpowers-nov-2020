import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { isThisTypeNode } from 'typescript';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor(
   private svc: CompanyService
  ) { }

  companies$: Observable<Company[]>;


  ngOnInit(): void {
    this.loadCompanies();
  }

  deleteCompany(company: Company): void {
    console.log('COMPONENT - delete company clicked', company);
    this.svc.deleteCompany(company)
    // .pipe (whatever)
    .subscribe((c: Company) => this.loadCompanies());
  }

  loadCompanies(): void {
    this.companies$ = this.svc.getCompanies();
  }
}
