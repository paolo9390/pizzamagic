import { Component, OnInit } from '@angular/core';
import { KidsMealService } from 'src/app/_services/kids-meal.service';
import { KidsMeal } from 'src/app/_interfaces/kids-meal';

@Component({
  selector: 'app-kids-meal',
  templateUrl: './kids-meal.component.html',
  styleUrls: ['./kids-meal.component.scss']
})
export class KidsMealComponent implements OnInit {

  img: string = '/assets/img/kids-meal/kids-meal.jpg'
  kidsmeals: KidsMeal[];

  constructor(private kidsMealService: KidsMealService) { }

  ngOnInit() {
    this.kidsMealService.getKidsMeals().subscribe(meals => this.kidsmeals = meals);
  }

}
