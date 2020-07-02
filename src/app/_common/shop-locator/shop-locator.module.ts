import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopLocatorComponent } from './shop-locator.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatListModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../../_store/reducers/favourite.reducer';
import { RouterModule } from '@angular/router';
import { LocatorDialogComponent } from './locator-dialog/locator-dialog.component';
import { A11yModule } from '@angular/cdk/a11y';


@NgModule({
  declarations: [ShopLocatorComponent, LocatorDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    RouterModule,
    A11yModule,
    StoreModule.forFeature('favourite', favouriteReducer)
  ],
  exports: [ShopLocatorComponent],
  entryComponents: [LocatorDialogComponent]
})
export class ShopLocatorModule { }
