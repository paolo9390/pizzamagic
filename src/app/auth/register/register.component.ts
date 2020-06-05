import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { AuthComponent } from '../auth.component';
import { PizzaMagicUser } from '../../_interfaces/user';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AuthComponent implements OnInit {


  registerForm: FormGroup;
  authErr: string = '';
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
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid){
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(
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
    if (this.registerForm.controls.email.hasError('required')) {
      return 'You must enter a valid email address';
    }

    return this.registerForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

}
