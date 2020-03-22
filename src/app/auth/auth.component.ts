import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title: string = 'Login to ORDER NOW';
  loginForm: FormGroup;
  isSubmitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        email: ['', [Validators.required,
        Validators.email]],
        password: ['', Validators.required]
    });
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('/home');
      },
      err => console.error(err)
    );
  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a valid email address';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
}
