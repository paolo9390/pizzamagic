import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/models/app-state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: any[] = [];
  constmenus: any[] = [
    {
      name: 'Pizzas',
      route: '/pizza',
      background: '#d62126',
      img: '/assets/img/menu/pizzas.png'
    },
    {
      name: 'Garlic Bread',
      route: '/garlic-bread',
      background: '#6eacbd',
      img: '/assets/img/menu/gbread.png'
    },
    {
      name: 'Burgers',
      route: '/burgers',
      background: '#389e86',
      img: '/assets/img/menu/burgers.png'
    },
    {
      name: 'Side Orders',
      route: '/side-orders',
      background: '#ffa800',
      img: '/assets/img/menu/fries.png'
    },
    {
      name: 'Kids Meal',
      route: '/kids-meal',
      background: '#db0201',
      img: '/assets/img/menu/kids.png'
    },
    {
      name: 'Dessert',
      route: '/desserts',
      background: '#e05a49',
      img: '/assets/img/menu/desserts.png'
    },
    {
      name: 'Beverages',
      route: '/drinks',
      background: '#ce8400',
      img: '/assets/img/menu/drinks.png'
    }
  ];

  route: string;
  selectedMenu: any;


  constructor(private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.route = this.router.url;
    this.getMenus();
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  getMenus() {
    this.constmenus.forEach(menu => {
      if (this.route === menu.route) {
        this.selectedMenu = menu;
      } else {
        this.menus.push(menu);
      }
    });
  }

}
