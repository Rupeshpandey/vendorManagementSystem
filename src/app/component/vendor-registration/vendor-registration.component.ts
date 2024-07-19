import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorCompositeModel } from 'src/app/models/vendor-composite.model';
import Swal from 'sweetalert2';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { CompanyContactComponent } from '../company-contact/company-contact.component';
import { BankingInformationComponent } from '../banking-information/banking-information.component';
import { Router } from '@angular/router';

type VendorCompositeModelKey = keyof VendorCompositeModel;

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.css']
})
export class VendorRegistrationComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('basicDetails') basicDetailsComponent!: BasicDetailsComponent;
  @ViewChild('companyContact') companyContactComponent!: CompanyContactComponent;
  @ViewChild('bankingInformation') bankingInformationComponent!: BankingInformationComponent;


  isTabValid: { [key in VendorCompositeModelKey]: boolean } = {
    vendor: false,
    companyContact: false,
    bankingInformation: false
  };

  
  formData: VendorCompositeModel = this.initializeFormData();

  constructor(private vendorService: VendorService, private router: Router) {}

  ngOnInit(): void { }

  onFormValid(tab: VendorCompositeModelKey, event: { valid: boolean; data: any }) {
    this.isTabValid[tab] = event.valid;
    this.formData[tab] = event.data;
    if (event.valid && tab !== 'bankingInformation') {
      this.continue(); 
    }
  }

  continue() {
    if (this.tabGroup) {
      const currentIndex = this.tabGroup.selectedIndex;
      if (currentIndex !== null && currentIndex !== undefined) {
        if (currentIndex < 2) {
          this.tabGroup.selectedIndex = currentIndex + 1;
        } else {
          if (Object.values(this.isTabValid).every(valid => valid)) {
            this.submitForm();
          } else {
            console.error('Some forms are invalid. Please complete all forms.');
            this.highlightInvalidForms();
          }
        }
      } else {
        console.error('Current index is not available');
      }
    } else {
      console.error('tabGroup is not available');
    }
  }

  submitForm() {
    debugger
      console.log(this.formData);
      this.vendorService.insertVendor(this.formData).subscribe(
        response => {
          console.log('Vendor registration successful', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Vendor registration successful!',
          });
          this.resetAllForms();
        },
        error => {
          console.error('Vendor registration failed', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Vendor registration failed. Please try again.',
          });
        }
      );
      this.resetAllForms();
  } 

  resetAllForms() {
    debugger
    if (this.basicDetailsComponent) this.basicDetailsComponent.resetForm();
    if (this.companyContactComponent) this.companyContactComponent.resetForm();
    if (this.bankingInformationComponent) this.bankingInformationComponent.resetForm();
    this.resetFormData();
  }
  resetFormData() {
    this.formData = this.initializeFormData();
    this.isTabValid = {
      vendor: false,
      companyContact: false,
      bankingInformation: false
    };
    this.navigateToTab(0);
    
  }

  initializeFormData(): VendorCompositeModel {
    
    return {
      
      vendor: {
        vendorID: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        mobile: '',
        dob: new Date(),
        panCard: '',
        profileImage: '',
        languagePreference: {
          hindi: false,
          english: false
        },
        district: '',
        block: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      companyContact: {
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
        updatedAt: new Date()
      },
      bankingInformation: {
        vendorID: 0,
        bankName: '',
        IFSCCode: '',
        accountNumber: '',
        Branch: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }; 
  }

  highlightInvalidForms() {
    const invalidTabs = Object.keys(this.isTabValid).filter(tab => !this.isTabValid[tab as VendorCompositeModelKey]);
    console.warn('Invalid tabs:', invalidTabs.join(', '));
    alert('Some forms are invalid. Please complete all forms.');
  }

  onTabChange(event: any): void {
    console.log('Tab changed to', event.index);
  }

  navigateToTab(index: number) {
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = index;
    } else {
      console.error('tabGroup is not available');
    }
  }
  logout() {
    // Clear any authentication tokens or user data here
    // Redirect to the login page
    this.router.navigate(['/login']);
  }

}
