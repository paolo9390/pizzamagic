import { Component, OnInit } from '@angular/core';
import { DessertDrinkService } from '../../_services/dessert-drink.service';
import { ActivatedRoute } from '@angular/router';
import { DessertDrink } from '../../_interfaces/dessert-drink';
import { OrderDComponent } from '../order-product/order-d/order-d.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dessert-drink',
  templateUrl: './dessert-drink.component.html',
  styleUrls: ['./dessert-drink.component.scss']
})
export class DessertDrinkComponent implements OnInit {

  mode: string;
  dds: DessertDrink[];
  imgs: any= {
    desserts: '/assets/img/dessert-drinks/dessert.jpg',
    drinks: '/assets/img/dessert-drinks/drink.jpg'
  }
  panelOpenState = false;

  constructor(private ddService: DessertDrinkService,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = data['mode'];
    });
    this.ddService.getAll().subscribe(dds => {
      this.dds = dds[this.mode];
    });
    
  }

  addProduct(d): void {
    const dialogRef = this.dialog.open(OrderDComponent, {
      maxHeight: '90%',
      data: {
        d: d
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
