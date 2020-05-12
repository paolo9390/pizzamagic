import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DessertDrinkComponent } from './dessert-drink.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatExpansionModule, MatCheckboxModule, MatRadioModule, MatCardModule, MatDialogModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';
import { OrderProductModule } from '../order-product/order-product.module';



@NgModule({
  declarations: [DessertDrinkComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
    OrderProductModule,
    MenuModule
  ]
})
export class DessertDrinkModule { }
