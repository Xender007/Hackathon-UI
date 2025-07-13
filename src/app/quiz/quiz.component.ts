import { Component, OnInit, HostListener } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  showBtn = false;

  assessmentResult: any[] = [];
  score: string = '';
  accuracy: number = 0;
  overallFeedback: string = '';
  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';
  desiredAccuracy = 0;
  statusClass: 'passed' | 'failed' | '' = '';

  timer = 300; // 5 minutes
  displayTime = '';
  countdownInterval: any;

  constructor(
    private quizService: QuizService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.quizService.startQuiz('PolyBanking.pdf').subscribe(res => {
      this.questions = res.questions;
      this.attemptId = res.attempt_id;
      this.selectedAnswers = new Array(this.questions.length).fill('');
      this.showBtn = true;
      this.spinner.hide();

      this.startTimer();
    });
  }

  getOptionKeys(options: any): string[] {
    return Object.keys(options);
  }

  onSelect(index: number, option: string): void {
    if (!this.submitted) {
      this.selectedAnswers[index] = option;
    }
  }

  getCorrectOption(index: number): string {
    return this.assessmentResult[index]?.correct_option;
  }

  onSubmit(autoSubmit = false): void {
    if (!autoSubmit && this.selectedAnswers.some(ans => !ans)) {
      this.showErrorPopup('⚠️ Please answer all questions to complete the quiz.');
      return;
    }

    this.spinner.show();
    clearInterval(this.countdownInterval);

    this.quizService.submitQuiz(this.attemptId, this.selectedAnswers).subscribe(res => {
      this.assessmentResult = res.assessment_result;
      this.score = res.score;
      this.accuracy = res.accuracy;
      this.overallFeedback = res.overall_feedback;
      this.submitted = true;

      this.statusClass = this.accuracy >= this.desiredAccuracy ? 'passed' : 'failed';

      if (autoSubmit) {
        this.showErrorPopup('⏰ Time is up! Quiz auto-submitted.');
      } else if (this.accuracy >= this.desiredAccuracy) {
        this.showSuccessPopup();
      }

      this.spinner.hide();
    });
  }

  showSuccessPopup(): void {
    this.popupType = 'success';
    this.popupMessage = this.overallFeedback;
    this.showPopup = true;
  }

  showErrorPopup(message: string): void {
    this.popupType = 'error';
    this.popupMessage = message;
    this.showPopup = true;
  }

  startTimer(): void {
    this.updateDisplayTime();
    this.countdownInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateDisplayTime();
      } else {
        clearInterval(this.countdownInterval);
        if (!this.submitted) {
          this.onSubmit(true); // autoSubmit = true
        }
      }
    }, 1000);
  }

  updateDisplayTime(): void {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  @HostListener('document:copy', ['$event']) blockCopy(e: ClipboardEvent) {
    e.preventDefault();
  }

  @HostListener('document:paste', ['$event']) blockPaste(e: ClipboardEvent) {
    e.preventDefault();
  }

  @HostListener('document:contextmenu', ['$event']) blockRightClick(e: MouseEvent) {
    e.preventDefault();
  }
}
