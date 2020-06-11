import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MenuMealDeal, MealDeal } from '../../_interfaces/meal-deal';
import { Topping } from '../../_interfaces/pizza';
import { Dip } from '../../_interfaces/side-order';
import { MealDealService } from '../../_services/meal-deal.service';
import { MatDialog } from '@angular/material';
import { OrderMealDealComponent } from './order-meal-deal/order-meal-deal.component';
import { KidsMeal } from '../../_interfaces/kids-meal';
import { OrderDComponent } from '../order-product/order-d/order-d.component';

@Component({
  selector: 'app-meal-deal',
  templateUrl: './meal-deal.component.html',
  styleUrls: ['./meal-deal.component.scss']
})
export class MealDealComponent implements OnInit {

  @ViewChildren ('checkBox') checkBox: QueryList<any>;
  dietaryTypes: string[] = ['pesceterian', 'chicken', 'vegeterian'];
  filtered: string[] = [];

  title: string = 'Meal Deals';
  panelOpenState = false;
  img: string = '/assets/img/pizzas/pizza.jpg'
  imgKids: string = '/assets/img/kids-meal/kids-meal.jpg'

  menu: MenuMealDeal;
  mealDeals: MealDeal[];
  kidsMeals: KidsMeal[];
  filteredKidsMeals: KidsMeal[];
  toppings: Topping[];
  dips: Dip[];


  constructor(private mealDealService: MealDealService,
    public dialog: MatDialog ) { }

  ngOnInit() {
    this.mealDealService.getMealDeals().subscribe(menu => {
      if (menu) {
        this.menu = menu;
        this.mealDeals = menu.mealDeals;
        this.dips = menu.dips;
        this.toppings = menu.toppings;       
      }
    });

    this.mealDealService.getKidsMeals().subscribe(kidsMeals => {
      this.kidsMeals = kidsMeals;
      this.filteredKidsMeals = kidsMeals;
    })
  }

  addMeal(meal: MealDeal): void {
    const dialogRef = this.dialog.open(OrderMealDealComponent, {
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: {
        mealDeal: meal,
        dips: this.dips,
        toppings: this.toppings
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addKidsMeal(d): void {
    const dialogRef = this.dialog.open(OrderDComponent, {
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: {
        d: d,
        type: 'kids-meal'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  filterMeals() {
    this.filteredKidsMeals = [];
    this.filtered = []; // resetting each Time new event is fire.

    // filtering only checked vlaue and assign to checked variable.
    const checked = this.checkBox.filter(checkbox => checkbox.checked);

    // then, we make object array of checked, and value by checked variable  
    checked.forEach(data => {
        this.filtered.push(data.value)
    })

    if (this.filtered.length > 0) {
      this.kidsMeals.forEach(meal => {
        if (this.filtered.some(f => f === meal.type)) {
          this.filteredKidsMeals.push(meal);
        }
      });
    } else {
      this.filteredKidsMeals = this.kidsMeals;
    }
  }
}
