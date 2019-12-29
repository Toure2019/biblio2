import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     return new Promise(
  //       (resolve, reject) => {
  //         firebase.auth().onAuthStateChanged(
  //           (user) => {
  //             if (user) {
  //               resolve(true);
  //             } else {
  //               resolve(false);
  //               this.router.navigate(['/auth', 'signin']);
  //             }
  //           }
  //         );
  //       }
  //     );
  //   }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {  
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              resolve(false);
              this.router.navigate(['/auth', 'signin']);
            }
          }
        );
      }
    );
  }
}