import { Component } from '@angular/core';
import { Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  @Input() bookTitle: string = '';
  @Input() bookAuthor: string = '';
  @Input() bookPublished: string = '';
  @Input() bookGenre: string = '';
  @Input() bookImage: string = '';

  
  // Test to pass in Book Data to Parent Library Component (works, but Book will take Input)

  // sampleBook = {
  //   Title: "Book Title",
  //   Author: "Book Author"
  // }

  // @Output() bookDetail = new EventEmitter<any>();

  // emitBookDetail() {
  //   this.bookDetail.emit(this.sampleBook)
  // }

}
