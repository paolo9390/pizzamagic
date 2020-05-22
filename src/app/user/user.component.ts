import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_interfaces/user';
import { Observable } from 'rxjs';
import { ThemeService } from '../core/services/theme.service';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/models/app-state';
import { ShopLocation } from '../_interfaces/pizza-magic.shop';
import { ColorSchemeService } from '../core/services/color-scheme.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  panelOpenState = false;
  isDarkTheme: Observable<boolean>;
  colorSheme: string;
  shop: ShopLocation;

  constructor(private userService: UserService,
    private colorSchemeService: ColorSchemeService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user);
    this.isDarkTheme = this.colorSchemeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.colorSchemeService.setDarkTheme(checked);
    
  }
  

}
