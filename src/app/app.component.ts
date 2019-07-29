import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){
    var config = {
      apiKey: "AIzaSyDEE6AjfS4cdd-S0jpoEi-llZqCv1SWd9E",
      authDomain: "projet-angular-2019.firebaseapp.com",
      databaseURL: "https://projet-angular-2019.firebaseio.com",
      projectId: "projet-angular-2019",
      storageBucket: "projet-angular-2019.appspot.com",
      messagingSenderId: "405579409768",
      appId: "1:405579409768:web:d48b01e2eb37c99d"
    };
    // Initialize Firebase 
    firebase.initializeApp(config);
  }
}
