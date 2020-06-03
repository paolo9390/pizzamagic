import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaComponent } from './pizza.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, MatToolbarModule, MatSidenavModule, MatExpansionModule, MatRadioModule, MatCheckboxModule, MatDialogModule, MatStepperModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { basketReducer } from '../../_store/reducers/basket.reducer';



@NgModule({
  declarations: [PizzaComponent, OrderPizzaComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('basket', basketReducer)
  ],
  entryComponents: [OrderPizzaComponent]
})
export class PizzaModule { }
