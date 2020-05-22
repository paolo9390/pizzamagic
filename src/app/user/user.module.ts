import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatListModule, MatTabsModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../_store/reducers/favourite.reducer';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    FormsModule,
    StoreModule.forFeature('favourite', favouriteReducer),
  ]
})
export class UserModule { }
