import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MatIconModule, MatButtonModule, MatListModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    FlexLayoutModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
