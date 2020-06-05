import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slogan: string = 'Your favourite local Pizzeria delivered to your door';
  company: string = 'Powered by pizzamagic.co.uk';
  messageTitle: string = 'Refreshingly Fresh';
  messageImg: string = '/assets/img/home/dough.jpg'
  message: string = 'Our ingredients are all fresh and locally sourced. We use no artificial ingredients or preservatives. Our dough is freshly made daily by hand no fat or oil is added in the process.';

  cards: any[] = [
    {
      title: 'Pizzas',
      route: '/pizza',
      img: '/assets/img/home/pizzas.jpg'
    },
    {
      title: 'Sides',
      route: '/side-orders',
      img: '/assets/img/home/sides.jpg'
    },
    {
      title: 'Burgers',
      route: '/burgers',
      img: '/assets/img/home/burgers.jpg'
    },
    {
      title: 'Meal Deals',
      route: '/deals',
      img: '/assets/img/home/deals.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
