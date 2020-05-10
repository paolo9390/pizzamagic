import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KidsMealComponent } from './kids-meal.component';
import { MenuModule } from '../menu/menu.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatButtonModule, MatExpansionModule, MatCheckboxModule, MatRadioModule } from '@angular/material';



@NgModule({
  declarations: [KidsMealComponent],
  imports: [
    CommonModule,
    MenuModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class KidsMealModule { }
