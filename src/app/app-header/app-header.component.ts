import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  constructor(
    private router: Router,
    private msalService: MsalService,
    private spinner: NgxSpinnerService
  ) {}
  
  isSidebarOpen = false;
  menuItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '📚', label: 'Modules' },
    { icon: '👤', label: 'Admin Panel' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '🚪', label: 'Logout' }
  ];

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.spinner.hide();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

   routeTo(label: string): void {
    switch (label) {
      case 'Home':
        this.router.navigate(['/chatbot']);
        break;
      case 'Modules':
        //this.router.navigate(['/modules']);
        break;
      case 'Admin Panel':
        this.router.navigate(['/file/upload']);
        this.closeSidebar();
        break;
      case 'Settings':
        //this.router.navigate(['/settings']);
        break;
      case 'Logout':
        this.logout();
        console.warn(`Logged Out!!`);
        break;
      default:
        console.warn(`No route defined for ${label}`);
    }
  }

  logout(): void {
    this.spinner.show();
    setTimeout(() => {
      localStorage.removeItem('access_token');
      this.msalService.logoutRedirect({ postLogoutRedirectUri: '/' });
    }, 800); // Slight delay to allow spinner to be visible
  }


}
