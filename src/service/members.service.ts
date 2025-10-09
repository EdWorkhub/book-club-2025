import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../interfaces/member.interface';

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

  getMemberDetailByFirebaseUid(id) {
    return this.http.get<any>(`${this.localApi}/members/${id}`);
  }

  getMemberDetailByLocalId(id) {
    return this.http.get<any>(`${this.localApi}/local-members/${id}`);
  }
}
