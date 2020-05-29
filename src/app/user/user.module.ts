import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatListModule, MatSlideToggleModule, MatFormFieldModule, MatDividerModule, MatInputModule, MatSelectModule, MatButtonModule, MatRippleModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../_store/reducers/favourite.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfigureAddressComponent } from './configure-address/configure-address.component';
import { ConfigurePreferencesComponent } from './configure-preferences/configure-preferences.component';



@NgModule({
  declarations: [UserComponent, ConfigureAddressComponent, ConfigurePreferencesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatRippleModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('favourite', favouriteReducer),
  ],
  entryComponents: [ConfigureAddressComponent, ConfigurePreferencesComponent]
})
export class UserModule { }
