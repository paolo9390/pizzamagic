import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { MatProgressBarModule } from '@angular/material';
import { LoaderService } from '../../_services/loader.service';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    LoaderService
  ]
})
export class LoaderModule { }
