import { Component, OnInit } from '@angular/core';
import { ShopLocatorComponent } from '../shop-locator.component';
import { MatDialogRef } from '@angular/material';
import { ShopService } from '../../../_services/shop.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/models/app-state';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-locator-dialog',
  templateUrl: './locator-dialog.component.html',
  styleUrls: ['./locator-dialog.component.scss']
})
export class LocatorDialogComponent extends ShopLocatorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LocatorDialogComponent>,
    _shopService: ShopService,
    _store: Store<AppState>,
    _router: Router,
    _route: ActivatedRoute,
    _userService: UserService) {
    super(_shopService, _store, _router, _route, _userService);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
