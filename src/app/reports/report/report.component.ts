import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../service/report.service';
import { AuthService } from '../../../service/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  @Input() bookId: number;
  @Output() close = new EventEmitter<void>();
  reportForm: FormGroup;
  isLoading = false;
  user: User | null = null;

  constructor(private formBuilder: FormBuilder, private reportService: ReportService, private authService: AuthService) {
    this.reportForm = this.formBuilder.group({
        firstQuestion:['', Validators.required],
        secondQuestion:['', Validators.required],
        thirdQuestion:['', Validators.required]
    });
      this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log('From search detail: ', user);
    });
  }

  // Stops background from scrolling while modal is open 
    ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  // Restores scroll upon modal close 
  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  submit() {
    if (this.reportForm.invalid) return; 

  // Answers can be added or removed here to change the report structure -> db already accepts an unlimited number of answers as report submissions and answers are joined together to produce final result 
  const payload = {
    bookId: this.bookId,
    memberId: this.user.uid,
    answers: [
      {
        question: "What is your favorite quote or message from the book?",
        answer: this.reportForm.value.firstQuestion
      },
      {
        question: "Is there anything in the book that if followed, might lead to some kind of improvement at Workhub?",
        answer: this.reportForm.value.secondQuestion
      },
      {
        question: "How does something you learned from this book tie into one of Workhub's core values?",
        answer: this.reportForm.value.thirdQuestion
      }
    ]
  };

    console.log("Payload: ", payload);
    this.isLoading = true;
    this.reportService.submitReport(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.close.emit();
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to submit report!');
      }
    });
  }

  dismiss() {
    this.close.emit();
  }
}
