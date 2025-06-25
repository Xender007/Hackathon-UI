import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { ModuleCardsComponent } from './module-cards/module-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    ChatbotComponent,
    AppHeaderComponent,
    HeroBannerComponent,
    ModuleCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // VERY IMPORTANT TO HAVE THIS!!!!
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
