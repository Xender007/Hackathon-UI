import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private msalService: MsalService) {}

  ngOnInit(): void {
    this.msalService.instance
      .handleRedirectPromise()
      .then((result: AuthenticationResult | null) => {
        if (result && result.account) {
          this.msalService.instance.setActiveAccount(result.account);
          localStorage.setItem('access_token', result.accessToken);

          // Redirect to chatbot after login
          this.router.navigate(['/chatbot']);
          //this.router.navigate(['/chatbot', { reload: new Date().getTime() }]);
        } else {
          const accounts = this.msalService.instance.getAllAccounts();
          if (accounts.length > 0) {
            this.msalService.instance.setActiveAccount(accounts[0]);
            // If user already logged in (page refresh), optionally redirect to chatbot
            this.router.navigate(['/chatbot']);
            //this.router.navigate(['/chatbot', { reload: new Date().getTime() }]);            
          }
        }
      })
      .catch((error) => {
        console.error('MSAL redirect handling error:', error);
      });
  }

  isMinimalLayoutRoute(): boolean {
    return this.router.url === '/file/upload' || this.router.url === '/quiz';
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login'; // Change if your login path differs
  }
}
