import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor() { }

  companies: Company[];

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companies = [
      {name: 'Company A', phone: 1234, email: 'CompanyA@ssw.com.au'},
      {name: 'Company B', phone: 1234, email: 'CompanyB@ssw.com.au'},
      {name: 'Company C', phone: 1234, email: 'CompanyC@ssw.com.au'},
    ];
  }

}
