import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorCompositeModel } from 'src/app/models/vendor-composite.model';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.css']
})
export class CompanyContactComponent {

  @Output() formValid = new EventEmitter<{ valid: boolean, data: any }>();
  @ViewChild('companyForm') companyForm!: NgForm;
  @Input() parentComponent: any;

  companyContact: VendorCompositeModel['companyContact'] = {
    vendorID: 0,
    companyName: '',
    telephone: '',
    fax: '',
    email: '',
    pointOfContactName: '',
    title: '',
    contactPhone1: '',
    mailingAddress: '',
    website: '',
    contactEmail: '',
    contactPhone2: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };


  constructor(private router: Router) {
    
   }

  ngOnInit() {
    this.formValid.emit({ valid: false, data: this.companyContact }); 
  }

  onFormChange() {
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.formValid.emit({ valid: this.companyForm.valid ?? false, data: this.companyContact });
  }

  continue(form: NgForm) {
    debugger
    this.checkFormValidity();
    if (this.companyForm.valid) {
      this.formValid.emit({ valid: true, data: this.companyContact });
    }
  }

  resetForm() {
    debugger;
    this.companyContact = {
      vendorID: 0,
      companyName: '',
      telephone: '',
      fax: '',
      email: '',
      pointOfContactName: '',
      title: '',
      contactPhone1: '',
      mailingAddress: '',
      website: '',
      contactEmail: '',
      contactPhone2: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.companyForm.resetForm(this.companyContact);
    this.formValid.emit({ valid: false, data: this.companyContact });
  }
  onTabChange(event: any): void {
    console.log('Tab changed to', event.index);
  }
  setData(data: VendorCompositeModel['companyContact']) {
    this.companyContact = data;
    this.companyContact.mailingAddress = data.mailingAddress
    //this.companyForm.resetForm(this.companyContact);
  }
}
