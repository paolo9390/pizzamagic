import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MethodPickerComponent } from './method-picker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatOptionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../../_store/reducers/favourite.reducer';



@NgModule({
  declarations: [MethodPickerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatCardModule,
    StoreModule.forFeature('favourite', favouriteReducer)
  ],
  entryComponents: [
    MethodPickerComponent
  ]
})
export class MethodPickerModule { }
