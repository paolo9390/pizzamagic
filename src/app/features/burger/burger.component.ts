import { Component, OnInit } from '@angular/core';
import { BurgerService } from '../../_services/burger.service';
import { Burger } from '../../_interfaces/burger';
import { OrderProductComponent } from '../order-product/order-product.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {

  img: string = '/assets/img/burgers/burger.png'
  burgers: Burger[];
  panelOpenState = false;

  constructor(private burgerService: BurgerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.burgerService.getBurgers().subscribe(burgers => this.burgers = burgers);
  }

  addBurger(burger): void {
    const dialogRef = this.dialog.open(OrderProductComponent, {
      maxHeight: '90%',
      data: {
        product: burger,
        type: 'burger'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
