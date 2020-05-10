import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { PizzaMagicUser } from '../_interfaces/user';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material';

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
  authErr: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        email: ['', [Validators.required,
        Validators.email]],
        password: ['', Validators.required]
    });
    this.authErr = '';
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        if (res) {
          const pmUser: PizzaMagicUser = {
            email: res.user.email,
            token: res.token,
            name: res.user.name.split(' ')[0]
          };
          this.userService.setUserValue(pmUser);
        }
        this.router.navigateByUrl('/home');
      },
      err => {
        console.error(err);
        this.authErr = err.error.error;
        this.openSnackBar(this.authErr, 'ok');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a valid email address';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
}
