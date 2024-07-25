import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vendorManagementFrontend';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/vendor-registration']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.authService.logout(); // Ensure to call the logout function of AuthService
    this.router.navigate(['/login']);
  }
}
