import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DessertDrinkComponent } from './dessert-drink.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatExpansionModule, MatCheckboxModule, MatRadioModule, MatCardModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';



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
    MatCardModule,
    MenuModule
  ]
})
export class DessertDrinkModule { }
