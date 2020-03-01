import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slogan: string = 'Change me';
  company: string = 'Powered by wedevelopit.co.uk';
  message: string = 'wedevelopit.co.uk provides modern front end web apps. Start building your website today.';

  constructor() { }

  ngOnInit() {
  }

}
