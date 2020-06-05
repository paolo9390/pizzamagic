import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AuthComponent } from '../auth.component';
import { PizzaMagicUser } from '../../_interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthComponent implements OnInit {

  authErr: string = '';
  loginForm: FormGroup;
  hide = true;
  
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    _userService: UserService,
    _router: Router,
    _route: ActivatedRoute) {
      super(_userService, _router, _route)
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm  =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authErr = '';
  }


  login(): void {
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
          this.redirectUser();
        }
      },
      err => {
        console.error(err);
        this.authErr = err.error.error;
      }
    );
  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a valid email address';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

}
