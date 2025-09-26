import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FirebaseService } from '../service/firebase.service';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private firebase: FirebaseService) {}
  title = 'book-club-2025';


}
