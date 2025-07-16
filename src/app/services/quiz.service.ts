import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private apiUrl = 'http://74.235.189.94:8000/';

  constructor(private http: HttpClient) {}

  startQuiz(fileName: string) {
    return this.http.post<any>(this.apiUrl + 'assessment/generate_quiz', { asset_id: fileName });
  }

  submitQuiz(attemptId: string, userAnswers: string[]) {
      const body = {
        attempt_id: attemptId,
        user_answers: userAnswers
      };
      return this.http.post<any>(this.apiUrl + 'assessment/evaluate_quiz', body);
  }
}
