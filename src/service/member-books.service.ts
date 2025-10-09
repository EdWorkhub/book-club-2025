import { Injectable } from '@angular/core';
import { LocalBook } from '../interfaces/local-book.interface';
import { FirebaseService } from './firebase.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberBooksService {
  constructor(
    private firebaseService: FirebaseService,
    private http: HttpClient
  ) {}

  // Local API
  private localApi = 'http://localhost:3000';
  memberBooks: LocalBook[] = [];
  memberId: string;

  ngOnInit() {
    this.firebaseService.auth.onAuthStateChanged(() => {
      if (!this.firebaseService.auth.currentUser) return;
      this.memberId = this.firebaseService.auth.currentUser.uid;
      this.getMemberBooks(this.memberId).subscribe((data) => {
        console.log(data);
        this.memberBooks = data;
      });
    });
  }

  // Run onInit in DashboardComponent
  getMemberBooks(memberId: string) {
    console.log('Attempting to get Member Books for: ', memberId);
    return this.http.get<any[]>(`${this.localApi}/member_books/${memberId}`);
  }

  getMemberBooksHistory(memberId: string) {
    console.log('Attempting to get Member Books History for: ', memberId);
    return this.http.get<any[]>(
      `${this.localApi}/member_books_history/${memberId}`
    );
  }

  getMemberReportedBooks(memberId: string) {
    console.log('Attempting to get Member Reported Books for: ', memberId);
    return this.http.get<any[]>(
      `${this.localApi}/member_reported_books/${memberId}`
    );
  }

  postSaveMemberBook(bookId: number, memberUid: string): Observable<LocalBook> {
    // saving bookId and member uid
    const dbObj = { bookId, memberUid };
    return this.http.post<any>(`${this.localApi}/member_books`, dbObj);
  }

  postMemberFinishedReading(bookId: number, memberId: string) {
    console.log(
      'Attempting to move book to Reading History for: ',
      bookId,
      memberId
    );
    const payload = { bookId, memberId };
    return this.http.post<any>(`${this.localApi}/move-to-read/`, payload);
  }
}
