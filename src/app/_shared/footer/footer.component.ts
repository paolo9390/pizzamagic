import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  web: string = 'pizzamagic.co.uk/org'
  message: string = 'All rights reserved to pizzamagic.co.uk';


  constructor() { }

  ngOnInit() {
  }

}
