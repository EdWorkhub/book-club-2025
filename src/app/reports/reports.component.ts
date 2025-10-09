import { Component } from '@angular/core';
import { ReportService } from '../../service/report.service';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {

  // <!-- This is a test bed component and will be deleted! -->
  // <!-- This is a test bed component and will be deleted! -->
  // <!-- This is a test bed component and will be deleted! -->

  report: any;
  reports: any[];
  log: any;

  constructor(private reportService: ReportService) {
    this.reportService.getAllBookReports().subscribe((res: any) => {
      this.reports = Object.values(res).map((report: any) => ({
        ...report,
        answers: JSON.parse(report.answers),
      }));
    });
  }
}
