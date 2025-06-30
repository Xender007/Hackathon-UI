import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'hackathon-ui-final';

  constructor(public router: Router) {}
  
  isFileUploadRoute(): boolean {
    return this.router.url === '/file/upload';
  }
}
