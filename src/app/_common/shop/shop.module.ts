import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule, MatIconModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../../_store/reducers/favourite.reducer';



@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    StoreModule.forFeature('favourite', favouriteReducer)
  ]
})
export class ShopModule { }
