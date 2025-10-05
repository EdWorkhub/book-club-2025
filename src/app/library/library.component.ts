import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { Router } from '@angular/router';
import { LocalBook } from '../../interfaces/book.interface';

@Component({
  selector: 'app-library',
  standalone: false,
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {

  constructor(private router: Router, private libraryService: LibraryService) {}

  bookList: any[] = [];
  dbList: any[] = [];

  ngOnInit(): void {
    // From Backend 
    this.libraryService.getLocalBooks().subscribe(data => {
      console.log(data);
      this.dbList = data;
    });
  };

  // parseData() {
  //   this.libraryService.postToDB();
  // }

  // Router Functions 
  navigateToSearch() {
    this.router.navigate(["/search"]);
  }

  navigateToMembers() {
    this.router.navigate(["/members"]);
  }

  navigateToDetail(book: LocalBook) {
    const id = book.id;
    this.router.navigate(["/book", id]);
  }

  navigateToDashboard() {
    this.router.navigate(["/dashboard"]);
  }


  }




