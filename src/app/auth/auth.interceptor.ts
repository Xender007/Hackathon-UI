// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent
// } from '@angular/common/http';
// import { Observable, from } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { MsalService } from '@azure/msal-angular';
// import { SilentRequest } from '@azure/msal-browser';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private msalService: MsalService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const account = this.msalService.instance.getActiveAccount();

//     if (!account) {
//       return next.handle(req);
//     }

//     const request: SilentRequest = {
//       scopes: ['user.read'], // Replace with your actual API scopes
//       account
//     };

//     return from(this.msalService.instance.acquireTokenSilent(request)).pipe(
//       switchMap(result => {
//         const cloned = req.clone({
//           setHeaders: {
//             Authorization: `Bearer ${result.accessToken}`
//           }
//         });
//         return next.handle(cloned);
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    // If no token, just forward the request unmodified
    return next.handle(req);
  }
}

