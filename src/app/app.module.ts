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
import { LoginUploadComponent } from './login-upload/login-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    ChatbotComponent,
    AppHeaderComponent,
    HeroBannerComponent,
    ModuleCardsComponent,
    LoginUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  // VERY IMPORTANT TO HAVE THIS!!!!
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
