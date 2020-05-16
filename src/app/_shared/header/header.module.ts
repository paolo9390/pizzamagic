import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatBadgeModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { shoppingReducer } from '../../_store/reducers/shopping.reducer';


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
    StoreModule.forRoot({shopping: shoppingReducer})
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
