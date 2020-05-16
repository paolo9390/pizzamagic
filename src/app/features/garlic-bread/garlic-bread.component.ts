import { Component, OnInit } from '@angular/core';
import { GarlicBreadService } from '../../_services/garlic-bread.service';
import { GarlicBread } from '../../_interfaces/garlic-bread';
import { MatDialog } from '@angular/material';
import { OrderProductComponent } from '../order-product/order-product.component';

@Component({
  selector: 'app-garlic-bread',
  templateUrl: './garlic-bread.component.html',
  styleUrls: ['./garlic-bread.component.scss']
})
export class GarlicBreadComponent implements OnInit {

  garlicBreads: GarlicBread[];
  img: string = '/assets/img/pizzas/pizza.jpg'
  panelOpenState = false;

  constructor(private garlicBreadService: GarlicBreadService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.garlicBreadService.getGarlicBreads().subscribe(gbreads => this.garlicBreads = gbreads);
  }

  addGarlicBread(bread): void {
    const dialogRef = this.dialog.open(OrderProductComponent, {
      maxHeight: '90%',
      data: {
        product: bread,
        type: 'garlic-bread'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
