import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatToolbarModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../_shared/title/title.module';
import { BasketModule } from '../basket/basket.module';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatTabsModule,
    RouterModule,
    TitleModule,
    BasketModule
  ],
  exports:[MenuComponent]
})
export class MenuModule { }
