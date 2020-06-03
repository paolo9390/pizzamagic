import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopLocatorComponent } from './shop-locator.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from '../../_store/reducers/favourite.reducer';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ShopLocatorComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('favourite', favouriteReducer)
  ],
  exports: [ShopLocatorComponent],
  entryComponents: [ShopLocatorComponent]
})
export class ShopLocatorModule { }
