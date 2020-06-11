import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealDealComponent } from './meal-deal.component';
import { OrderMealDealComponent } from './order-meal-deal/order-meal-deal.component';
import { MenuModule } from '../menu/menu.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatButtonModule, MatExpansionModule, MatCheckboxModule, MatRadioModule, MatDialogModule, MatStepperModule } from '@angular/material';
import { OrderProductModule } from '../order-product/order-product.module';
import { StoreModule } from '@ngrx/store';
import { basketReducer } from '../../_store/reducers/basket.reducer';
import { KidsMealModule } from '../kids-meal/kids-meal.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MealDealComponent, OrderMealDealComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MenuModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    OrderProductModule,
    KidsMealModule,
    StoreModule.forFeature('basket', basketReducer)
  ],
  entryComponents: [
    OrderMealDealComponent
  ]
})
export class MealDealModule { }
