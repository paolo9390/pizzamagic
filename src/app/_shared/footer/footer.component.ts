import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  web: string = 'pizzamagic.co.uk'
  message: string = 'All rights reserved to pizzamagic.co.uk';

  discover = [
    {
      name: 'About Us',
      route: '/about-us'
    },
    {
      name: 'Career',
      route: '/career'
    },
    {
      name: 'Become a Driver',
      route: '/career/driver'
    }
  ];

  help = [
    {
      name: 'Contact Us',
      route: '/contact-us'
    },
    {
      name: 'News',
      route: '/news'
    },
    {
      name: 'Terms and Conditions',
      route: '/terms'
    }
  ]



  constructor() { }

  ngOnInit() {
  }

}