import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
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

  @ViewChildren ('checkBox') checkBox: QueryList<any>;
  dietaryTypes: string[] = ['vegeterian', 'chicken', 'vegan'];
  filtered: string[] = [];

  img: string = '/assets/img/sides/fries.jpg';
  dipimg: string = '/assets/img/sides/dips.jpg';
  sideOrders: SideOrder[];
  filteredSides: SideOrder[];
  dips: Dip[];
  panelOpenState = false;

  constructor(private sideService: SideOrdersService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.sideService.getSideOrders().subscribe(sides => {
      this.sideOrders = sides;
      this.filteredSides = sides;
    });
    this.sideService.getDips().subscribe(dips => this.dips = dips);
  }

  addSide(side): void {
    const dialogRef = this.dialog.open(OrderProductComponent, {
      maxHeight: '90%',
      data: {
        product: side,
        type: 'side-order',
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
        d: d,
        type: 'dips'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  filterSides() {
    this.filteredSides = [];
    this.filtered = []; // resetting each Time new event is fire.

    // filtering only checked vlaue and assign to checked variable.
    const checked = this.checkBox.filter(checkbox => checkbox.checked);

    // then, we make object array of checked, and value by checked variable  
    checked.forEach(data => {
        this.filtered.push(data.value)
    })

    if (this.filtered.length > 0) {
      this.sideOrders.forEach(side => {
        if (this.filtered.some(f => f === side.type)) {
          this.filteredSides.push(side);
        }
      });
    } else {
      this.filteredSides = this.sideOrders;
    }
  }
}
