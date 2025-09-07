import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-library',
  standalone: false,
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {

  constructor(private libraryService: LibraryService) {}

  bookList: any[] = [];

  bookTitle: string = '';
  bookAuthor: string = '';
  bookPublished: string = '';
  bookGenre: string = '';
  bookImage: string = '';

  ngOnInit(): void {
    this.bookList = this.libraryService.books;
    console.log(this.bookList);
  }

  }

  // TODO: 
  // Fetch JSON Data from Service 
  // "handle" each JSON value 
  // Generate that value into *ngFor app-book

  // fetchBookList() {
  //   this.bookList = this.libraryService.books
  // }


