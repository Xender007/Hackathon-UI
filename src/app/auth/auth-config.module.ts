import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://login.microsoftonline.com/618ce2a1-9ca5-48fd-9b5b-78b87861291d/v2.0',
            authWellknownEndpointUrl: 'https://login.microsoftonline.com/common/v2.0',
            redirectUrl: window.location.origin,
            clientId: '5e9ce920-5d8e-4b96-b986-b98a76d95aa1',
            scope: 'openid profile email offline_access', // 'openid profile offline_access ' + your scopes
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            maxIdTokenIatOffsetAllowedInSeconds: 600,
            issValidationOff: false,
            autoUserInfo: false,
            customParamsAuthRequest: {
              prompt: 'select_account', // login, consent
            },
    }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
