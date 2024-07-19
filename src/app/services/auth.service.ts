import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  login(username: string, password: string): Observable<boolean> {
    // Here you would make a request to your backend to validate the user
    // For this example, we'll just check if the username and password are correct
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return of(true);
    }
    return of(false);
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
