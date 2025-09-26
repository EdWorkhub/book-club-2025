import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const firebaseService = inject(FirebaseService)
  const router = inject(Router)
  const user = firebaseService.auth.currentUser

  if (user) {
    return true;
  } else {
    console.log('Authentication failed!');
    router.navigate(['/login']);
    return false;
  }
};
