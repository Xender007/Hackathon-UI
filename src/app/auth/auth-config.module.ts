// import { NgModule } from '@angular/core';
// import { AuthModule } from 'angular-auth-oidc-client';


// @NgModule({
//     imports: [AuthModule.forRoot({
//         config: {
//             authority: 'https://login.microsoftonline.com/94e1538a-3b46-4d3f-b78c-1f1613e4b6a2/v2.0',
//             authWellknownEndpointUrl: 'https://login.microsoftonline.com/common/v2.0',
//             redirectUrl: window.location.origin,
//             clientId: 'bbc2e2de-cce1-44b0-9844-514e6ae941ec',
//             scope: 'openid profile email offline_access', // 'openid profile offline_access ' + your scopes
//             responseType: 'code',
//             silentRenew: true,
//             useRefreshToken: true,
//             maxIdTokenIatOffsetAllowedInSeconds: 600,
//             issValidationOff: false,
//             autoUserInfo: false,
//             customParamsAuthRequest: {
//               prompt: 'select_account', // login, consent
//             },
//     }
//       })],
//     exports: [AuthModule],
// })
// export class AuthConfigModule {}

