import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from 'firebase/auth';

// export const authGuard: CanActivateFn = async (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   console.log('AuthGuard: waiting for user$...');

//   if (authService.user) {
//     return true;
//   } else {
//     console.log('Not found in authService');
//     router.navigate(['/login']);
//     return false;
//   }

  // const user = await new Promise<User | null>((resolve) => {
  //   const unsubscribe = authService.auth.onAuthStateChanged((u) => {
  //     console.log('AuthGuard: Firebase auth state changed:', u);
  //     unsubscribe();
  //     resolve(u);
  //   });
  // });
  
  // console.log('AuthGuard: resolved user:', user);

  // if (user) {
  //   return true;
  // } else {
  //   console.log('AuthGuard: no user, redirecting to login');
  //   router.navigate(['/login']);
  //   return false;
  // }
