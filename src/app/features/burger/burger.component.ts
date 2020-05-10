import { Component, OnInit } from '@angular/core';
import { BurgerService } from '../../_services/burger.service';
import { Burger } from '../../_interfaces/burger';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {

  img: string = '/assets/img/burgers/burger.png'
  burgers: Burger[];

  constructor(private burgerService: BurgerService) { }

  ngOnInit() {
    this.burgerService.getBurgers().subscribe(burgers => this.burgers = burgers);
  }

}
