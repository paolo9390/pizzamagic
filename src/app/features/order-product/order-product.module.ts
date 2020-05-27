import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProductComponent } from './order-product.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatIconModule, MatCardModule, MatButtonModule, MatRadioModule, MatCheckboxModule, MatExpansionModule } from '@angular/material';
import { OrderDComponent } from './order-d/order-d.component';
import { StoreModule } from '@ngrx/store';
import { basketReducer } from 'src/app/_store/reducers/basket.reducer';



@NgModule({
  declarations: [OrderProductComponent, OrderDComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    StoreModule.forFeature('basket', basketReducer)
  ],
  entryComponents: [OrderProductComponent, OrderDComponent]
})
export class OrderProductModule { }
