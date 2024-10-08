import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PanverificationService } from 'src/app/services/panverification.service';
import { DistrictsService } from 'src/app/services/districts.service';
import { BlocksService } from 'src/app/services/blocks.service';
import { VendorCompositeModel } from 'src/app/models/vendor-composite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent {

  @Output() formValid = new EventEmitter<{ valid: boolean, data: any }>();
  @ViewChild('basicForm') basicForm!: NgForm;
  @Input() parentComponent: any;
  

  vendor: VendorCompositeModel['vendor'] = {
    vendorID: 1,
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
    updatedAt: new Date(),
  };

  districts: string[] = [];
  blocks: string[] = [];
  fileValid = true;

  constructor(private router: Router, 
    private panverificationService: PanverificationService,
    private districtsService: DistrictsService,
    private blocksService: BlocksService) {}

  ngOnInit() {
    this.formValid.emit({ valid: false, data: this.vendor });
    this.loadDistricts();
    if (this.vendor.district) {
      this.loadBlocks(Number(this.vendor.district));
    }
  }

  loadDistricts() {
    this.districtsService.getDistricts().subscribe(
      (data: any[]) => {
        this.districts = data.map(district => district.district_Name);
        console.log('Districts:', this.districts);  
      },
      (error) => {
        console.error('Error loading districts', error);
      }
    );
  }
  
  loadBlocks(districtId: number) {
    this.blocksService.getBlocks(districtId).subscribe(
      (data: any[]) => {
        this.blocks = data.map(block => block.block_Name);
        console.log('Blocks:', this.blocks);  
      },
      (error) => {
        console.error('Error loading blocks', error);
      }
    );
  }

  onDistrictChange() {
    console.log('District changed:', this.vendor.district);
    const districtId = Number(this.vendor.district);
    console.log('Parsed districtId:', districtId);
    if (!isNaN(districtId)) {
      this.loadBlocks(districtId);
    } else {
      console.log('Invalid districtId:', this.vendor.district);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.vendor.profileImage = reader.result as string;
      };
      reader.onerror = error => {
        console.log('Error: ', error);
      };
    }
  }

  checkFormValidity() {
    this.formValid.emit({ valid: this.basicForm.valid ?? false, data: this.vendor });
  }

  onFormChange() {
    this.checkFormValidity();
  }

  continue() {
    this.checkFormValidity();
    if (this.basicForm.valid) {
      this.formValid.emit({ valid: true, data: this.vendor });
    }
  }

  resetForm() {
    this.vendor = {
      vendorID: 1,
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
      updatedAt: new Date(),
    };
    this.basicForm.resetForm(this.vendor);
    this.formValid.emit({ valid: false, data: this.vendor });
  }
  setData(data: any) {

    console.log(data)
    this.vendor.mobile = data.mobile
    this.vendor.block = data.block
    this.vendor.profileImage = ''
    this.vendor = data;
     //this.basicForm.resetForm(this.vendor);
  }

  
}
