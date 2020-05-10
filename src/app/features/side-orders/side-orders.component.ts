import { Component, OnInit } from '@angular/core';
import { SideOrdersService } from '../../_services/side-orders.service';
import { SideOrder, Dip } from '../../_interfaces/side-order';

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

  constructor(private sideService: SideOrdersService) { }

  ngOnInit() {
    this.sideService.getSideOrders().subscribe(sides => this.sideOrders = sides);
    this.sideService.getDips().subscribe(dips => this.dips = dips);
  }

}
