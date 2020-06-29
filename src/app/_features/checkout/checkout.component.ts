import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Observable } from 'rxjs';
import { PizzaMagicUser } from '../../_interfaces/user';
import { AppState } from '../../_store/models/app-state';
import { Store } from '@ngrx/store';
import { FavouriteState } from '../../_store/models/favourite';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // user vars
  user$: Observable<PizzaMagicUser>;

  // favorite state
  favorite$: Observable<FavouriteState>;

  constructor(private userService: UserService,
    private store: Store<AppState>) { }

  ngOnInit() {
    // get preselected favorites
    this.favorite$ = this.store.select(store => store.favourite);
    // get user 
    this.user$ = this.userService.currentUser;
  }

}
