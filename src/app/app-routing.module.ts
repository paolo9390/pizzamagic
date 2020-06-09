import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './core/selective-preloading-strategy.service';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ShopGuard } from './_helpers/shop.guard';
import { AuthGuard } from './_helpers/auth.guard';
import { UserComponent } from './user/user.component';
import { PizzaComponent } from './_features/pizza/pizza.component';
import { GarlicBreadComponent } from './_features/garlic-bread/garlic-bread.component';
import { BurgerComponent } from './_features/burger/burger.component';
import { SideOrdersComponent } from './_features/side-orders/side-orders.component';
import { DessertDrinkComponent } from './_features/dessert-drink/dessert-drink.component';
import { KidsMealComponent } from './_features/kids-meal/kids-meal.component';
import { CheckoutComponent } from './_features/checkout/checkout.component';
import { CheckoutGuard } from './_helpers/checkout.guard';
import { MealDealComponent } from './_features/meal-deal/meal-deal.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent},
  { path: 'home', component: HomeComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'meal-deals', component: MealDealComponent, canActivate: [ShopGuard]  },
  { path: 'pizza', component: PizzaComponent, canActivate: [ShopGuard]  },
  { path: 'burgers', component: BurgerComponent, canActivate: [ShopGuard]  },
  { path: 'garlic-bread', component: GarlicBreadComponent, canActivate: [ShopGuard]  },
  { path: 'side-orders', component: SideOrdersComponent, canActivate: [ShopGuard]  },
  { path: 'desserts', component: DessertDrinkComponent, data: { mode: 'desserts'}, canActivate: [ShopGuard]  },
  { path: 'drinks', component: DessertDrinkComponent, data: { mode: 'drinks'}, canActivate: [ShopGuard]  },
  { path: 'kids-meal', component: KidsMealComponent, canActivate: [ShopGuard]  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    { enableTracing: false, preloadingStrategy: SelectivePreloadingStrategyService }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }