import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    TitleComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    TitleComponent
  ]
})
export class TitleModule { }
