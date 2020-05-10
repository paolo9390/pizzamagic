import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatListModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatSlideToggleModule
  ]
})
export class UserModule { }
