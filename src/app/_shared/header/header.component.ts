import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { PizzaMagicUser } from 'src/app/_interfaces/user';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = 'Pizza Magic';
  isDarkTheme: Observable<boolean>;
  logo: string = '/assets/img/pizzamagic-white.png';
  user: PizzaMagicUser;

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'magic',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/magic.svg'));
     }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.user = user);
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.router.navigateByUrl('login');
        this.userService.resetUser();
      }
    );
  }

}
