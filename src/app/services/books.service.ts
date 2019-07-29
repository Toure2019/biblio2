import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
//import DataSnapshot from 'firebase/database';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  private books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  
  constructor() {}

  emitBooksSubject(){
    this.booksSubject.next(this.books.slice());
  }

  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }

  getBooks(){
    firebase.database().ref('/books')
    .on('value', (snapshot) => {
      this.books = snapshot.val() ? snapshot.val() : [];
      this.emitBooksSubject();
    });
  }

  // récupère un livre selon son id, qui est simplement ici son index dans l'array enregistré.
  getSingleBook(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(`/books/${id}`).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooksSubject();
  }

  removeBook(book: Book){
    // Suppression Photo
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed !');
        },
        (error) => {
          console.log('Could not remove photo !' + error);
        }
      );
    }
    //Fin Suppression Photo

    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooksSubject();
  }

  // TRAITEMENT DES IMAGES

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
              .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement !', error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
