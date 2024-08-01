import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VendorRegistrationComponent } from './component/vendor-registration/vendor-registration.component';
import { VendorListComponent } from './component/vendor-list/vendor-list.component';
import { BasicDetailsComponent } from './component/basic-details/basic-details.component';
import { CompanyContactComponent } from './component/company-contact/company-contact.component';
import { BankingInformationComponent } from './component/banking-information/banking-information.component';
import { LoginComponent } from './component/login/login.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    VendorRegistrationComponent,
    VendorListComponent,
    BasicDetailsComponent,
    CompanyContactComponent,
    BankingInformationComponent,
    LoginComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
