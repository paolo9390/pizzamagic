import { Component, OnInit } from '@angular/core';
import { SideOrdersService } from '../../_services/side-orders.service';
import { SideOrder, Dip } from '../../_interfaces/side-order';
import { MatDialog } from '@angular/material';
import { OrderProductComponent } from '../order-product/order-product.component';
import { OrderDComponent } from '../order-product/order-d/order-d.component';

@Component({
  selector: 'app-side-orders',
  templateUrl: './side-orders.component.html',
  styleUrls: ['./side-orders.component.scss']
})
export class SideOrdersComponent implements OnInit {

  img: string = '/assets/img/sides/fries.jpg';
  dipimg: string = '/assets/img/sides/dips.jpg';
  sideOrders: SideOrder[];
  dips: Dip[];
  panelOpenState = false;

  constructor(private sideService: SideOrdersService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.sideService.getSideOrders().subscribe(sides => this.sideOrders = sides);
    this.sideService.getDips().subscribe(dips => this.dips = dips);
  }

  addSide(side): void {
    const dialogRef = this.dialog.open(OrderProductComponent, {
      maxHeight: '90%',
      data: {
        product: side,
        dips: this.dips
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
