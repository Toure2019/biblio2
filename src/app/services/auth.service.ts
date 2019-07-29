import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private books: Book[] = [];
  // bookSubject = new Subject<Book[]>();

  // constructor() { }

  // emitBookSubject(){
  //   this.bookSubject.next(this.books.slice());
  // }

  // Toutes les méthodes liées à l'authentification Firebase se trouvent dans "" firebase.auth().  ""
  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
            console.log('User créé avec succès !');
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signIn(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
            console.log('Connexion réussit !');
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOut(){
    firebase.auth().signOut();
  }
}
