import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaComponent } from './pizza.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, MatToolbarModule, MatSidenavModule, MatExpansionModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [PizzaComponent],
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
    MatCheckboxModule,
    MenuModule
  ]
})
export class PizzaModule { }
