import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {

  constructor() { }

  @Input()
  companies: Company[];

  @Output()
  deleteClicked: EventEmitter<Company> = new EventEmitter();

  ngOnInit(): void {
  }

  deleteCompany(company: Company): void {
    this.deleteClicked.emit(company);
  }

}
