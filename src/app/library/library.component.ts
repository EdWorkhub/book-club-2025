import { AfterViewInit, OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-library',
  standalone: false,
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  textValue: string = '';

  handleBook(value: any) {
    this.textValue = value
  }

  // handleBook(event: any) {
  //   let textValue = JSON.stringify(event);
  //   console.log(textValue);
  //   if (textValue) {
  //     document.append(textValue, textField)
  //   }
  // }
}
