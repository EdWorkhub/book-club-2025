import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalBook } from '../interfaces/local-book.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

    toLibrary(): void {
      this.router.navigate(['/library']);
    }
  
    toSearch(): void {
      this.router.navigate(['/search']);
    }
  
    toMembers(): void {
      this.router.navigate(['/members']);
    }
  
    toLogin(): void {
      this.router.navigate(['/login']);
    }
  
    toDashboard(): void {
      this.router.navigate(['/dashboard']);
    }
  
    toBookDetail(id: number): void {
      this.router.navigate(['/book', id]);
    }

    toMemberDetail(id: number): void {
    this.router.navigate(['/member', id]);
  }
}
