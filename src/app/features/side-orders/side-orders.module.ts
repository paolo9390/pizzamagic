import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideOrdersComponent } from './side-orders.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule, MatCardModule, MatIconModule, MatButtonModule, MatRadioModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';
import { OrderProductModule } from '../order-product/order-product.module';



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
    MatDialogModule,
    MenuModule,
    OrderProductModule
  ]
})
export class SideOrdersModule { }
