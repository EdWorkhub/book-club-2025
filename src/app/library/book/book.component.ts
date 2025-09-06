import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  sampleBook = {
    Title: "Book Title",
    Author: "Book Author"
  }

  @Output() bookDetail = new EventEmitter<any>();

  emitBookDetail() {
    this.bookDetail.emit(this.sampleBook)
  }

}
