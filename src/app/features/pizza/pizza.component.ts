import { Component, OnInit } from '@angular/core';
import { Pizza, PizzaBase, PizzaSize, Topping, PizzaMenu } from '../../_interfaces/pizza';
import { PizzaService } from '../../_services/pizza.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {

  title: string = 'Pizzas';
  img: string = '/assets/img/pizzas/pizza.jpg'

  menu: PizzaMenu;
  pizzas: Pizza[];
  vegeterianPizzas: Pizza[] = [];
  housespecialPizzas: Pizza[] = [];
  pizzabases: PizzaBase[];
  pizzasizes: PizzaSize[];
  toppings: Topping[];


  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzaService.getMenu().subscribe(menu => {
      if (menu) {
        this.menu = menu;
        this.pizzas = menu.pizzas;
        this.pizzabases = menu.bases;
        this.pizzasizes = menu.sizes;
        this.toppings = menu.toppings;

        menu.pizzas.forEach(pizza => {
          if (pizza.vegeterian) this.vegeterianPizzas.push(pizza);
          else this.housespecialPizzas.push(pizza);
        });
      }
    })
  }

}
