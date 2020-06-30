import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GeneralInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericInfoData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface GenericInfoData {
  title: string;
  icon: string;
  description: string;
  more?: {
    info: string;
    url: string;
  }
}