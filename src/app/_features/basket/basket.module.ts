import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { basketReducer } from '../../_store/reducers/basket.reducer';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    StoreModule.forFeature('basket', basketReducer)
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
