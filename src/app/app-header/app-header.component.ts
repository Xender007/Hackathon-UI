import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  constructor(private router: Router) {}
  
  isSidebarOpen = false;
  menuItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '📚', label: 'Modules' },
    { icon: '👤', label: 'Admin Panel' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '🚪', label: 'Logout' }
  ];


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
        //this.handleLogout();
        console.warn(`Logged Out!!`);
        break;
      default:
        console.warn(`No route defined for ${label}`);
    }
  }


}
