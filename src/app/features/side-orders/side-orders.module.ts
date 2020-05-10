import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideOrdersComponent } from './side-orders.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule, MatCardModule, MatIconModule, MatButtonModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [SideOrdersComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MenuModule
  ]
})
export class SideOrdersModule { }
