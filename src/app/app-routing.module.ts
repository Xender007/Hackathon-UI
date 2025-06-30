import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginUploadComponent } from './login-upload/login-upload.component';

const routes: Routes = [
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'file/upload', component: LoginUploadComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
