import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private apiUrl = 'http://20.246.73.80:5000/api/';

  constructor(private http: HttpClient) {}

  startQuiz(fileName: string) {
    return this.http.post<any>(this.apiUrl + 'start-quiz', { file_name: fileName });
  }

  submitQuiz(attemptId: string, userAnswers: string[]) {
      const body = {
        attempt_id: attemptId,
        user_answers: userAnswers
      };
      return this.http.post<any>(this.apiUrl + 'submit-quiz', body);
  }
}
