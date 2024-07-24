import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7158/api/Login';
  private readonly TOKEN_KEY = 'authToken'; // Key for storing the token in localStorage

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, passwordHash: password }).pipe(
      map(response => {
        console.log('API response:', response);
        if (response.message === 'Login successful') {
          // Simulate token storage, replace 'dummy-token' with actual token if returned
          localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    // Check if token exists in local storage
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    // Remove token from local storage on logout
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
