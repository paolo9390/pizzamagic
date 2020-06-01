import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatListModule, MatButtonModule, MatDividerModule, MatToolbarModule, MatRippleModule, MatCardModule, MatFormFieldModule, MatButtonToggleModule, MatInputModule, MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { TitleModule } from '../../_shared/title/title.module';
import { BasketModule } from '../basket/basket.module';
import { FormsModule } from '@angular/forms';
import { basketReducer } from '../../_store/reducers/basket.reducer';
import { favouriteReducer } from '../../_store/reducers/favourite.reducer';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    TitleModule,
    BasketModule,
    FormsModule,
    StoreModule.forRoot({basket: basketReducer, favourite: favouriteReducer})
  ]
})
export class CheckoutModule { }
