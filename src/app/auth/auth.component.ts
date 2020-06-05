import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title: string = 'Log in or sign up';
  authAction: 'login' | 'register';
  returnUrl: string;

  constructor(
    protected userService: UserService,
    protected router: Router,
    protected route: ActivatedRoute) { }

  ngOnInit() {
  }

  selectAction(action: 'login' | 'register'): void {
    this.authAction = action;
  }

  // set user preferences at login if any are found
  redirectUser(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    if (this.router.url !== '/checkout') this.router.navigateByUrl(this.returnUrl);
  }

  resetAuthAction(): void {
    this.authAction = undefined;
  }
}
