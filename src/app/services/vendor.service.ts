import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { VendorCompositeModel } from '../models/vendor-composite.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'https://localhost:7158/api/Vendor';

  constructor(private http: HttpClient) { }

  insertVendor(model: VendorCompositeModel): Observable<VendorCompositeModel> {
    return this.http.post<VendorCompositeModel>(this.apiUrl, model)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateVendor(id: number, model: VendorCompositeModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteVendor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getVendor(id: number): Observable<VendorCompositeModel> {
    return this.http.get<VendorCompositeModel>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getVendors(): Observable<VendorCompositeModel[]> {
    return this.http.get<VendorCompositeModel[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error appropriately
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
