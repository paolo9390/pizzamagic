import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatListModule, MatSlideToggleModule, MatFormFieldModule, MatDividerModule, MatInputModule, MatSelectModule, MatButtonModule, MatRippleModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfigureAddressComponent } from './configure-address/configure-address.component';
import { ConfigurePreferencesComponent } from './configure-preferences/configure-preferences.component';
import { DeactivateUserComponent } from './deactivate-user/deactivate-user.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserComponent, ConfigureAddressComponent, ConfigurePreferencesComponent, DeactivateUserComponent],
  imports: [
    CommonModule,
    RouterModule,
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
    FormsModule
  ],
  entryComponents: [ConfigureAddressComponent, ConfigurePreferencesComponent, DeactivateUserComponent]
})
export class UserModule { }
