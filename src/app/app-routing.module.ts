import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorRegistrationComponent } from './component/vendor-registration/vendor-registration.component';
import { VendorListComponent } from './component/vendor-list/vendor-list.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vendor-registration', component: VendorRegistrationComponent },
  { path: 'vendor-list', component: VendorListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route to login page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
