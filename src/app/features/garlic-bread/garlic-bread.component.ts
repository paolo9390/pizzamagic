import { Component, OnInit } from '@angular/core';
import { GarlicBreadService } from '../../_services/garlic-bread.service';
import { GarlicBread } from '../../_interfaces/garlic-bread';

@Component({
  selector: 'app-garlic-bread',
  templateUrl: './garlic-bread.component.html',
  styleUrls: ['./garlic-bread.component.scss']
})
export class GarlicBreadComponent implements OnInit {

  garlicBreads: GarlicBread[];
  img: string = '/assets/img/pizzas/pizza.jpg'

  constructor(private garlicBreadService: GarlicBreadService) { }

  ngOnInit() {
    this.garlicBreadService.getGarlicBreads().subscribe(gbreads => this.garlicBreads = gbreads);
  }

}
