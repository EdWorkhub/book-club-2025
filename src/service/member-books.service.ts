import { Injectable } from '@angular/core';
import { LocalBook } from '../interfaces/book.interface';
import { LibraryService } from './library.service';
import { FirebaseService } from './firebase.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberBooksService {

  constructor(private libraryService: LibraryService, private firebaseService: FirebaseService, private http: HttpClient) { }

  // Local API
  private localApi = 'http://localhost:3000';

  memberBooks: LocalBook[] = [];

  memberId: string;

  ngOnInit() {
    this.firebaseService.auth.onAuthStateChanged(() => {
      if (!this.firebaseService.auth.currentUser)
        return;
      this.memberId = this.firebaseService.auth.currentUser.uid;
      this.getMemberBooks(this.memberId).subscribe(data => {
        console.log(data);
        this.memberBooks = data;
      })
    })
  }

  // Run onInit in DashboardComponent 
  getMemberBooks(memberId) {
    console.log("Attempting to get Member Books for: ", memberId)
    return this.http.get<any[]>(`${this.localApi}/member_books/${memberId}`);
  }

}
