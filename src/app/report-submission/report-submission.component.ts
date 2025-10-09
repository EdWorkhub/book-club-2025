import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-submission',
  standalone: false,
  templateUrl: './report-submission.component.html',
  styleUrls: ['./report-submission.component.scss'],
})
export class ReportSubmissionComponent {
  @Input() report: any;
  // user currently being passed in as displayName, can change once I deal with Report Interface and refactor any properties here -> at the end!
  @Input() user: any;

  get parsedAnswers() {
    return this.report && this.report.answers
      ? this.report.answers // DO NOT parse again after backend response!
      : [];
  }
}
