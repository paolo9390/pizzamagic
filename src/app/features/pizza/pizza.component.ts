import { Component, OnInit } from '@angular/core';
import { Pizza, PizzaBase, PizzaSize, Topping, PizzaMenu } from '../../_interfaces/pizza';
import { PizzaService } from '../../_services/pizza.service';
import { MatDialog } from '@angular/material';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {

  title: string = 'Pizzas';
  panelOpenState = false;
  img: string = '/assets/img/pizzas/pizza.jpg'

  menu: PizzaMenu;
  pizzas: Pizza[];
  vegeterianPizzas: Pizza[] = [];
  housespecialPizzas: Pizza[] = [];
  pizzabases: PizzaBase[];
  pizzasizes: PizzaSize[];
  toppings: Topping[];


  constructor(private pizzaService: PizzaService,
    public dialog: MatDialog ) { }

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

  addPizza(pizza): void {
    const dialogRef = this.dialog.open(OrderPizzaComponent, {
      maxHeight: '90%',
      data: {
        pizza: pizza,
        bases: this.pizzabases,
        sizes: this.pizzasizes,
        toppings: this.toppings
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}