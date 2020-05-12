import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarlicBreadComponent } from './garlic-bread.component';
import { MenuModule } from '../menu/menu.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatButtonModule, MatExpansionModule, MatCheckboxModule, MatRadioModule, MatDialogModule } from '@angular/material';
import { OrderProductModule } from '../order-product/order-product.module';



@NgModule({
  declarations: [GarlicBreadComponent],
  imports: [
    CommonModule,
    MenuModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    OrderProductModule
  ]
})
export class GarlicBreadModule { }
