import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  standalone: false
})
export class AdminLoginComponent {
isAuthenticated = false;
  userName = '';

  constructor(private authService: OidcSecurityService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      this.isAuthenticated = isAuthenticated;
      this.userName = userData?.name || userData?.email || '';

      // ✅ Navigate after login
      if (isAuthenticated) {
        this.router.navigate(['/chatbot']);
      }
    });
  }

  login(): void {
    this.authService.authorize();
  }

  logout(): void {
    this.authService.logoff(); // ✅ Method name is `logoff` not `logOut`
  }
}
