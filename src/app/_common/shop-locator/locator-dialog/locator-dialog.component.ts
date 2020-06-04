import { Component, OnInit } from '@angular/core';
import { ShopLocatorComponent } from '../shop-locator.component';
import { MatDialogRef } from '@angular/material';
import { ShopService } from 'src/app/_services/shop.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/models/app-state';
import { Router, ActivatedRoute } from '@angular/router';

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
    _route: ActivatedRoute) {
    super(_shopService, _store, _router, _route);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
