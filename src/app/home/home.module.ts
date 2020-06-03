import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule, MatButtonModule, MatCardModule, MatListModule, MatDividerModule, MatRippleModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ShopLocatorModule } from '../_common/shop-locator/shop-locator.module';


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
    RouterModule,
    ShopLocatorModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
