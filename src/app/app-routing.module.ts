import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginUploadComponent } from './login-upload/login-upload.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  // Public route - login accessible by anyone
  { path: 'login', component: AdminLoginComponent },

  // Protected routes - require login
  { path: 'chatbot', component: ChatbotComponent, canActivate: [AuthGuard] },
  { path: 'file/upload', component: LoginUploadComponent, canActivate: [AuthGuard] },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  // Redirect everything else to login
  { path: '**', redirectTo: '/login', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
