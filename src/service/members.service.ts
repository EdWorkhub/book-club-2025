import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../interfaces/member.interface';
import sampleMemberData from '../json/sample-members.json'
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  
  constructor(private http: HttpClient) {}

  Members: Member[] = [];

  // Local API
  private localApi = 'http://localhost:3000';

  // Sqlite3 Connection -> Fetches all members 
  getDBMembers() {
    return this.http.get<any[]>(`${this.localApi}/members`);
  }

  getMemberDetail(id) {
    return this.http.get<any>(`${this.localApi}/members/${id}`);
  }

  // Post JSON data to Local DB 
  postToDB() {
    // define JSON to pass in 
    const requests = (sampleMemberData as any[]).filter(member => !!member).map(member => 
      // push each member
      this.http.post<any[]>(`${this.localApi}/members`, member));
    // combine reponses 
    forkJoin(requests).subscribe({
      next: responses => {
        console.log("posted", responses);
      },
      error: err => {
        console.error("post failed", err);
      }
    });
  };

  // JSON Sample Data
  // getMembers() {
  //   return sampleMemberData;
  // }
}
