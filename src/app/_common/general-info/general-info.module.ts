import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInfoComponent } from './general-info.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [GeneralInfoComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule
  ],
  entryComponents: [GeneralInfoComponent]
})
export class GeneralInfoModule { }
