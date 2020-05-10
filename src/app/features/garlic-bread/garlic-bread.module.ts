import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarlicBreadComponent } from './garlic-bread.component';
import { MenuModule } from '../menu/menu.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatButtonModule, MatExpansionModule, MatCheckboxModule, MatRadioModule } from '@angular/material';



@NgModule({
  declarations: [GarlicBreadComponent],
  imports: [
    CommonModule,
    MenuModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class GarlicBreadModule { }
