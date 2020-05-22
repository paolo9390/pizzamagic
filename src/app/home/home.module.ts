import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatDividerModule, MatRippleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../_store/reducers/favourite.reducer';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('favourite', favouriteReducer)
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
