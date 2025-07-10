import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: string[] = [];
  attemptId: string = '';
  submitted = false;

  assessmentResult: any[] = [];
  score: string = '';
  accuracy: number = 0;
  overallFeedback: string = '';
  showPopup = false;
  desiredAccuracy = 0;
  statusClass: 'passed' | 'failed' | '' = '';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.startQuiz('PolyBanking.pdf').subscribe(res => {
      this.questions = res.questions;
      this.attemptId = res.attempt_id;
      this.selectedAnswers = new Array(this.questions.length).fill('');
    });
  }

  onSelect(index: number, option: string) {
    if (!this.submitted) {
      this.selectedAnswers[index] = option;
    }
  }

  getOptionKeys(options: any): string[] {
    return Object.keys(options);
  }

  getCorrectOption(index: number): string {
    return this.assessmentResult[index]?.correct_option;
  }

  getSelectedOption(index: number): string {
    return this.selectedAnswers[index];
  }

  isCorrect(index: number): boolean {
    return this.assessmentResult[index]?.is_correct;
  }

  onSubmit() {
    this.quizService.submitQuiz(this.attemptId, this.selectedAnswers).subscribe(res => {
      this.assessmentResult = res.assessment_result;
      this.score = res.score;
      this.accuracy = res.accuracy;
      this.overallFeedback = res.overall_feedback;
      this.submitted = true;

      this.statusClass = this.accuracy >= this.desiredAccuracy ? 'passed' : 'failed';

      if (this.accuracy >= this.desiredAccuracy) {
        this.showPopup = true;
      }
    });
  }
}
