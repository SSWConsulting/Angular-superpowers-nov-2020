import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  isNewCompany: boolean;
  companyId: number;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !this.companyId;
    this.buildForm();

    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
      .subscribe(c => this.companyForm.patchValue(c));
    }
  }

  buildForm(): void {
    // this.companyForm = new FormGroup({
    //   name: new FormControl(),
    //   phone: new FormControl(),
    //   email: new FormControl()
    // });

    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['Test@ssw.com.au']
    });
  }

  saveCompany(): void {

    if (this.isNewCompany) {
      const company: Company = this.companyForm.value;
      this.companyService.addCompany(company)
      .subscribe((c: Company) => this.router.navigateByUrl('/company/list'));

    }else{
      // let c: Company = {
      //   id: this.companyId,
      //   name: this.companyForm.get('name').value,
      //   phone: this.companyForm.get('phone').value,
      //   email: this.companyForm.get('email').value
      // };

      const c: Company = {...this.companyForm.value, id: this.companyId};

      this.companyService.updateCompany(c)
      .subscribe((c: Company) => this.router.navigateByUrl('/company/list'));
    }


  }

}
