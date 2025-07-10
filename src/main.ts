import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './app/auth/auth.config';


// ✅ Initialize MSAL before bootstrapping Angular
// const msalInstance = new PublicClientApplication(msalConfig);

// msalInstance.initialize()
//   .then(() => {
//     // Optional: set active account if already logged in
//     const accounts = msalInstance.getAllAccounts();
//     if (accounts.length > 0) {
//       msalInstance.setActiveAccount(accounts[0]);
//     }

//     // Bootstrap the Angular app
//     platformBrowserDynamic().bootstrapModule(AppModule)
//       .catch(err => console.error(err));
//   })
//   .catch(err => {
//     console.error('MSAL initialization failed:', err);
//   });
  
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
