import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, SilentRequest } from '@azure/msal-browser';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  standalone: false
})
export class AdminLoginComponent {
  userName: string | null = null;
  hasToken = false;

  constructor(
    private msalService: MsalService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    const account = this.msalService.instance.getActiveAccount();
    if (account) {
      this.userName = account.name ?? null;
    }

    this.hasToken = !!localStorage.getItem('access_token');
  }

  login(): void {
    this.spinner.show();
    this.msalService.loginRedirect();
  }

  logout(): void {
    this.msalService.logoutRedirect({ postLogoutRedirectUri: '/' });
    localStorage.removeItem('access_token');
  }
}
