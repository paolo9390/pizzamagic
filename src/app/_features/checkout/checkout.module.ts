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
import { AuthModule } from '../../auth/auth.module';
import { GeneralInfoModule } from 'src/app/_common/general-info/general-info.module';
import { MethodComponent } from './method/method.component';
import { PaymentComponent } from './payment/payment.component';
import { ShopComponent } from './shop/shop.component';
import { DeliveryComponent } from './delivery/delivery.component';



@NgModule({
  declarations: [CheckoutComponent, MethodComponent, PaymentComponent, ShopComponent, DeliveryComponent],
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
    AuthModule,
    BasketModule,
    FormsModule,
    GeneralInfoModule,
    StoreModule.forRoot({basket: basketReducer, favourite: favouriteReducer})
  ],
  exports: [
    ShopComponent,
    PaymentComponent,
    MethodComponent,
    DeliveryComponent
  ]
})
export class CheckoutModule { }
