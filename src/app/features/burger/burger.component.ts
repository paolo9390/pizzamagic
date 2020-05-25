import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
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

  @ViewChildren ('checkBox') checkBox: QueryList<any>;
  dietaryTypes: string[] = ['beef', 'chicken', 'vegan'];
  filtered: string[] = [];
  img: string = '/assets/img/burgers/burger.png'
  burgers: Burger[];
  filteredBurgers: Burger[];
  panelOpenState = false;

  constructor(private burgerService: BurgerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.burgerService.getBurgers().subscribe(burgers => {
      this.filteredBurgers = burgers;
      this.burgers = burgers;
    } );
  }

  addBurger(burger): void {
    const dialogRef = this.dialog.open(OrderProductComponent, {
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: {
        product: burger,
        type: 'burger'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  filterBurgers() {
    this.filteredBurgers = [];
    this.filtered = []; // resetting each Time new event is fire.

    // filtering only checked vlaue and assign to checked variable.
    const checked = this.checkBox.filter(checkbox => checkbox.checked);

    // then, we make object array of checked, and value by checked variable  
    checked.forEach(data => {
        this.filtered.push(data.value)
    })

    if (this.filtered.length > 0) {
      this.burgers.forEach(burger => {
        if (this.filtered.some(f => f === burger.type)) {
          this.filteredBurgers.push(burger);
        }
      });
    } else {
      this.filteredBurgers = this.burgers;
    }
  }
}
