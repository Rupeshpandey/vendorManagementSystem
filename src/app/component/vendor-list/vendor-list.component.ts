import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorCompositeModel } from 'src/app/models/vendor-composite.model';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendors: VendorCompositeModel[] = [];
  displayedColumns: string[] = ['vendorID', 'companyName', 'contactEmail', 'bankName'];

  constructor(private vendorService: VendorService, private router: Router) { }

  ngOnInit(): void {
    this.fetchVendors();
  }

  fetchVendors(): void {
    this.vendorService.getVendors().subscribe(
      (data: VendorCompositeModel[]) => {
        this.vendors = data;
      },
      error => {
        console.error('Error fetching vendors:', error);
      }
    );
  }

  navigateToVendorRegistration(): void {
    this.router.navigate(['/vendor-registration']);
  }
}
