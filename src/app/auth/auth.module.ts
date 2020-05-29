import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../_store/reducers/favourite.reducer';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    StoreModule.forRoot({favourite: favouriteReducer})
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
