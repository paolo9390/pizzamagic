import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerComponent } from './burger.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule, MatCardModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { BasketModule } from '../basket/basket.module';



@NgModule({
  declarations: [BurgerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MenuModule,
    OrderProductModule
  ]
})
export class BurgerModule { }
