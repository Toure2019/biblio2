import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent }, 
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent },
  { path: 'notfound', component: NotFoundComponent},
  { path: '', pathMatch: 'full', redirectTo: 'books'},
  { path: '**', redirectTo: 'notfound'}
];
// node_modules/bootstrap/dist/css
//FireBase : 1- npm install firebase --save

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    BookFormComponent,
    HeaderComponent,
    SingleBookComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
