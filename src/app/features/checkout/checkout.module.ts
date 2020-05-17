import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatListModule, MatButtonModule, MatDividerModule, MatToolbarModule, MatRippleModule, MatCardModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { shoppingReducer } from '../../_store/reducers/shopping.reducer';
import { TitleModule } from '../../_shared/title/title.module';



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
    TitleModule,
    StoreModule.forRoot({shopping: shoppingReducer})
  ]
})
export class CheckoutModule { }
