import { Component, OnInit } from '@angular/core';
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

  companies: Company[];

  ngOnInit(): void {
    const component = this;
    this.svc.getCompanies().subscribe(
      next => this.companies = next,
      error => console.error(error),
      () => console.log('Complete')
    );
  }



}
