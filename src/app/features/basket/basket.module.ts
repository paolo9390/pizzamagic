import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { shoppingReducer } from '../../_store/reducers/shopping.reducer';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    StoreModule.forRoot({shopping: shoppingReducer})
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
