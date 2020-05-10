import { Component, OnInit } from '@angular/core';
import { DessertDrinkService } from 'src/app/_services/dessert-drink.service';
import { ActivatedRoute } from '@angular/router';
import { DessertDrink } from 'src/app/_interfaces/dessert-drink';

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

  constructor(private ddService: DessertDrinkService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = data['mode'];
    });
    this.ddService.getAll().subscribe(dds => {
      this.dds = dds[this.mode];
    });
    
  }
}
