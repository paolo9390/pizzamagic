import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatListModule, MatSlideToggleModule, MatFormFieldModule, MatDividerModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../_store/reducers/favourite.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('favourite', favouriteReducer),
  ]
})
export class UserModule { }
