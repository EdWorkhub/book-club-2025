import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

    // Local API
  private localApi = 'http://localhost:3000';

  getAllBookReports(): Observable<any> {
    return this.http.get<any[]>(`${this.localApi}/book_reports/`);
  }

  getBookReportsByBook(bookId: number): Observable<any> {
    return this.http.get<any[]>(`${this.localApi}/book_reports/${bookId}`);
  }

  getBookReportsByMember(memberId: number): Observable<any> {
    return this.http.get<any[]>(`${this.localApi}/book_reports/${memberId}`)
  }

  submitReport(payload: object): Observable<any> {
    return this.http.post<any>(`${this.localApi}/book_reports`, payload);
  }

  
}
