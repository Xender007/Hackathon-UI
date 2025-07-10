import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { ModuleCardsComponent } from './module-cards/module-cards.component';
import { LoginUploadComponent } from './login-upload/login-upload.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

// MSAL Angular
import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest, protectedResources } from './auth/auth.config';
import { AuthInterceptor } from './auth/auth.interceptor';
import { QuizComponent } from './quiz/quiz.component';

// ✅ Custom Auth Interceptor


// ✅ Properly await MSAL init before app boot
export function initializeMsalInstance(msalService: MsalService) {
  return async () => {
    await msalService.instance.initialize();
    const accounts = msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      msalService.instance.setActiveAccount(accounts[0]);
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    ChatbotComponent,
    AppHeaderComponent,
    HeroBannerComponent,
    ModuleCardsComponent,
    LoginUploadComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // ✅ MSAL Configuration
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig),
      {
        interactionType: InteractionType.Redirect,
        authRequest: loginRequest
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [protectedResources.graphMe.endpoint, protectedResources.graphMe.scopes],
        ])
      }
    ),

    // Material
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  providers: [
    MsalService,
    MsalGuard,
    MsalBroadcastService,

    // ✅ Custom AuthInterceptor to attach access token
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    // ✅ Await MSAL initialization before the app starts
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsalInstance,
      deps: [MsalService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
