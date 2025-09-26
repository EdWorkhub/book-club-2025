import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  @Input() bookTitle: string = '';
  @Input() bookAuthor: string = '';
  @Input() bookDescription: string = '';
  @Input() bookPublished: string = '';
  @Input() bookImage: string = '';
  @Input() bookPages: number;
  @Input() bookISBN: string = '';

}
