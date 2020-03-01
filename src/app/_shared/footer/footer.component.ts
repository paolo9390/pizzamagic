import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  web: string = 'somethingcool.co.uk/org'
  message: string = 'All rights reserved to wedevelopit.co.uk';


  constructor() { }

  ngOnInit() {
  }

}
