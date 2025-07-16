import { Component, OnInit, HostListener } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: string[] = [];
  assessmentResult: any[] = [];

  attemptId: string = '';
  submitted = false;
  showBtn = false;

  showEmailPopup = false;
  recipientEmail = '';
  emailError = '';

  score: number = 0;
  accuracy: number = 0;
  overallFeedback: string = '';
  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';
  statusClass: 'passed' | 'failed' | '' = '';

  timer = 600;
  displayTime = '';
  countdownInterval: any;
  timerStarted = false;

  constructor(
    private quizService: QuizService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.route.queryParams.pipe(first()).subscribe(params => {
      const title = params['title'];
      if (!title) {
        console.error('Missing query param: title');
        this.spinner.hide();
        return;
      }

      this.quizService.startQuiz(title).subscribe({
        next: (res) => {
          this.questions = res.questions;
          this.attemptId = res.attempt_id;
          this.selectedAnswers = new Array(this.questions.length).fill('');
          this.showBtn = true;
          this.spinner.hide();

          if (!this.timerStarted) {
            this.startTimer();
            this.timerStarted = true;
          }

          const updatedParams = { ...params, attempt_id: this.attemptId };
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: updatedParams,
            queryParamsHandling: 'merge',
            replaceUrl: true
          });
        },
        error: (err) => {
          console.error('Failed to start quiz:', err);
          this.spinner.hide();
        }
      });
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

  getFeedback(index: number): string {
    return this.assessmentResult[index]?.feedback || '';
  }

  onSubmit(autoSubmit = false): void {
    if (!autoSubmit && this.selectedAnswers.some(ans => !ans)) {
      this.showErrorPopup('⚠️ Please answer all questions to complete the quiz.');
      return;
    }

    this.spinner.show();
    clearInterval(this.countdownInterval);

    this.quizService.submitQuiz(this.attemptId, this.selectedAnswers).subscribe(res => {
      this.assessmentResult = res.question_results;
      this.score = res.score;
      this.accuracy = res.score; // backend score is percentage
      this.overallFeedback = res.overall_feedback;
      this.submitted = true;

      this.statusClass = res.status === 'Pass' ? 'passed' : 'failed';

      if (autoSubmit) {
        this.showErrorPopup('⏰ Time is up! Quiz auto-submitted.');
      } else if (this.statusClass === 'passed') {
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
          this.onSubmit(true);
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

  openEmailPopup(): void {
    this.recipientEmail = '';
    this.emailError = '';
    this.showEmailPopup = true;
  }

  closeEmailPopup(): void {
    this.showEmailPopup = false;
    this.recipientEmail = '';
    this.emailError = '';
  }

  sendEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.recipientEmail) {
      this.emailError = 'Email is required.';
      return;
    }

    if (!emailRegex.test(this.recipientEmail.trim())) {
      this.emailError = 'Please enter a valid email address.';
      return;
    }

    const attemptId = this.route.snapshot.queryParamMap.get('attempt_id');
    if (!attemptId) {
      this.emailError = 'Attempt ID is missing. Cannot send email.';
      return;
    }

    const payload = {
      recipient: this.recipientEmail.trim(),
      attempt_id: attemptId
    };

    this.http.post('http://74.235.189.94:8000/email/send', payload).subscribe({
      next: () => {
        alert(`✅ Results sent to ${this.recipientEmail}`);
        this.closeEmailPopup();
      },
      error: (err) => {
        console.error('❌ Error sending email:', err);
        this.emailError = 'Failed to send email. Please try again.';
      }
    });
  }
}
