import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaComponent } from './pizza.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, MatToolbarModule, MatSidenavModule, MatExpansionModule, MatRadioModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PizzaComponent, OrderPizzaComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MenuModule,
    FormsModule
  ],
  entryComponents: [OrderPizzaComponent]
})
export class PizzaModule { }
