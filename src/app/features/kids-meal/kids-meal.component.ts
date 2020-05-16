import { Component, OnInit } from '@angular/core';
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

  img: string = '/assets/img/kids-meal/kids-meal.jpg'
  kidsmeals: KidsMeal[];
  panelOpenState = false;

  constructor(private kidsMealService: KidsMealService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.kidsMealService.getKidsMeals().subscribe(meals => this.kidsmeals = meals);
  }

  addProduct(d): void {
    const dialogRef = this.dialog.open(OrderDComponent, {
      maxHeight: '90%',
      data: {
        d: d,
        type: 'kids-meal'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
