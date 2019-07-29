import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.initForm();
  }

  initForm(){
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    // Récupération des valeurs des champ "input" 2 méthodes: 
    // const email = this.signupForm.get('email').value;
    // const password = this.signupForm.get('password').value;
    const formValue = this.signupForm.value;
    this.authService.createNewUser(formValue.email, formValue.password).then(
      () => {
        this.router.navigate(['/auth', 'signin']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
