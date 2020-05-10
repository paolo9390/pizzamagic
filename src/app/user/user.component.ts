import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_interfaces/user';
import { Observable } from 'rxjs';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  panelOpenState = false;
  isDarkTheme: Observable<boolean>;

  constructor(private userService: UserService,
    private themeService: ThemeService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user);
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
