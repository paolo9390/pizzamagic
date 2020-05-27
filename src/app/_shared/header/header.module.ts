import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatBadgeModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { basketReducer } from '../../_store/reducers/basket.reducer';
import { favouriteReducer } from '../../_store/reducers/favourite.reducer';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    FlexLayoutModule,
    StoreModule.forRoot({basket: basketReducer, favourite: favouriteReducer})
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
