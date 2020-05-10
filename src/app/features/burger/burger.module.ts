import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerComponent } from './burger.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule, MatCardModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';



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
    MenuModule
  ]
})
export class BurgerModule { }
