import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { KidsMealService } from '../../_services/kids-meal.service';
import { KidsMeal } from '../../_interfaces/kids-meal';
import { OrderDComponent } from '../order-product/order-d/order-d.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-kids-meal',
  templateUrl: './kids-meal.component.html',
  styleUrls: ['./kids-meal.component.scss']
})
export class KidsMealComponent implements OnInit {

  @ViewChildren ('checkBox') checkBox: QueryList<any>;
  dietaryTypes: string[] = ['pesceterian', 'chicken', 'vegeterian'];
  filtered: string[] = [];

  img: string = '/assets/img/kids-meal/kids-meal.jpg'
  kidsmeals: KidsMeal[];
  filteredMeals: KidsMeal[];
  panelOpenState = false;

  constructor(private kidsMealService: KidsMealService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.kidsMealService.getKidsMeals().subscribe(meals => {
      this.kidsmeals = meals;
      this.filteredMeals = meals;
    });
  }

  addProduct(d): void {
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
    this.filteredMeals = [];
    this.filtered = []; // resetting each Time new event is fire.

    // filtering only checked vlaue and assign to checked variable.
    const checked = this.checkBox.filter(checkbox => checkbox.checked);

    // then, we make object array of checked, and value by checked variable  
    checked.forEach(data => {
        this.filtered.push(data.value)
    })

    if (this.filtered.length > 0) {
      this.kidsmeals.forEach(meal => {
        if (this.filtered.some(f => f === meal.type)) {
          this.filteredMeals.push(meal);
        }
      });
    } else {
      this.filteredMeals = this.kidsmeals;
    }
  }
}
