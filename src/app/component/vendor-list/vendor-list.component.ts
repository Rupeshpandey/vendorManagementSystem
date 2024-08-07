import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorCompositeModel } from 'src/app/models/vendor-composite.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendors: VendorCompositeModel[] = [];

  constructor(private vendorService: VendorService, private router: Router) { }

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.vendorService.getVendors().subscribe(
      vendors => this.vendors = vendors,
      error => console.error('Error loading vendors', error)
    );
  }

  editVendor(id: number) {
    this.router.navigate(['/vendor-registration', id, { mode: 'edit' }]);
  }

  deleteVendor(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this vendor!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vendorService.deleteVendor(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'The vendor has been deleted.', 'success');
            this.loadVendors();
          },
          error => Swal.fire('Error!', 'Failed to delete the vendor.', 'error')
        );
      }
    });
  }

  vendorregistration() {
    this.router.navigate(['/vendor-registration']);
  }
}
