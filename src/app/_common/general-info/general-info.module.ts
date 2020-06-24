import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInfoComponent } from './general-info.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatDialogModule, MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [GeneralInfoComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [GeneralInfoComponent]
})
export class GeneralInfoModule { }
