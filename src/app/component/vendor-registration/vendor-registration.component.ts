import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorCompositeModel } from 'src/app/models/vendor-composite.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { CompanyContactComponent } from '../company-contact/company-contact.component';
import { BankingInformationComponent } from '../banking-information/banking-information.component';

type VendorCompositeModelKey = keyof VendorCompositeModel;

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.css']
})
export class VendorRegistrationComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild(BasicDetailsComponent) basicForm!: BasicDetailsComponent;
  @ViewChild(CompanyContactComponent) companyForm!: CompanyContactComponent;
  @ViewChild(BankingInformationComponent) bankingForm!: BankingInformationComponent;

  isTabValid: { [key in VendorCompositeModelKey]: boolean } = {
    vendor: false,
    companyContact: false,
    bankingInformation: false
  };


  formData: VendorCompositeModel = this.initializeFormData();
  vendorId: number = 0;
  mode: string = 'add';

  constructor(private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.mode = params.get('mode') || 'add';

      if (this.mode === 'edit' && id) {
        this.loadVendorData(id);
      }
      
    });
  }
  loadVendorData(id: number) {
    this.vendorService.getVendor(id).subscribe(
      data => {
        console.log('Loaded vendor data:', data); // Log the entire data object
         // Inspect specific fields here
      console.log('Vendor Mobile:', data.vendor.mobile);
      console.log('Vendor Block:', data.vendor.block);
      console.log('Vendor Profile Image:', data.vendor.profileImage);
      console.log('Vendor Address:', data.companyContact.mailingAddress);
      console.log('Vendor Branch Name:', data.bankingInformation.Branch);
      
      // Rest of the existing code...
  
        this.formData = data;
        console.log('Form data set:', this.formData); // Log the formData object
  
        if (this.basicForm) {
          
          this.basicForm.setData(data.vendor);
          console.log('Basic form data set:', data.vendor); // Log data passed to basicForm
        }
        if (this.companyForm) {
          this.companyForm.setData(data.companyContact);
          console.log('Company contact form data set:', data.companyContact); // Log data passed to companyForm
        }
        if (this.bankingForm) {
          this.bankingForm.setData(data.bankingInformation);
          console.log('Banking information form data set:', data.bankingInformation); // Log data passed to bankingForm
        }
      },
      error => console.error('Error loading vendor data', error)
    );
  }
  
  onFormValid(tab: VendorCompositeModelKey, event: { valid: boolean; data: any }) {
    this.isTabValid[tab] = event.valid;
    this.formData[tab] = event.data;
    if (event.valid && tab !== 'bankingInformation') {
      this.continue();
    }
  }

  continue() {
    const currentIndex = this.tabGroup?.selectedIndex;
    if (currentIndex !== null && currentIndex !== undefined) {
      if (currentIndex < 2) {
        this.tabGroup.selectedIndex = currentIndex + 1;
      } else {
        if (Object.values(this.isTabValid).every(valid => valid)) {
          this.submitForm();
        } else {
          this.highlightInvalidForms();
        }
      }
    } else {
      console.error('Current index is not available');
    }
  }

  submitForm() {
    console.log('Submitting form with payload:', this.formData);
    if (this.mode === 'edit') {
      console.log(this.formData);
      this.vendorService.updateVendor(this.vendorId, this.formData).subscribe(
        () => {
          Swal.fire('Updated!', 'The vendor has been updated.', 'success');
          this.resetAllForms();
          this.router.navigate(['/vendor-list']);
        },
        
        error => {
          console.error('Error updating vendor:', error);
          Swal.fire('Error!', 'Failed to update the vendor.', 'error');
        }
      );
    } else {
      this.vendorService.insertVendor(this.formData).subscribe(
        () => {
          Swal.fire('Added!', 'The vendor has been added.', 'success');
          this.resetAllForms();
          this.router.navigate(['/vendor-list']);
        },
        error => Swal.fire('Error!', 'Failed to add the vendor.', 'error')
      );
    }
  }


  resetFormData() {
    console.log('Before reset: ', this.formData);
    this.formData = this.initializeFormData(); 
    console.log('After reset: ', this.formData);
    this.isTabValid = {
      vendor: false,
      companyContact: false,
      bankingInformation: false
    };
    this.navigateToTab(0);
  }

  resetAllForms() {
    if (this.basicForm) {
      this.basicForm.resetForm();

    }
    if (this.companyForm) {
      console.log('Company form before reset:', this.companyForm);
      this.companyForm.resetForm();
      console.log('Company form after reset:', this.companyForm);
    }
    if (this.bankingForm) {
      console.log('Banking form before reset:', this.bankingForm);
      this.bankingForm.resetForm();
      console.log('Banking form after reset:', this.bankingForm);
    }

    this.resetFormData();
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

  vendorlist() {
    this.router.navigate(['/vendor-list']);
  }


}
