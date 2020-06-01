import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './core/selective-preloading-strategy.service';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ShopGuard } from './_helpers/shop.guard';
import { AuthGuard } from './_helpers/auth.guard';
import { UserComponent } from './user/user.component';
import { PizzaComponent } from './features/pizza/pizza.component';
import { GarlicBreadComponent } from './features/garlic-bread/garlic-bread.component';
import { BurgerComponent } from './features/burger/burger.component';
import { SideOrdersComponent } from './features/side-orders/side-orders.component';
import { DessertDrinkComponent } from './features/dessert-drink/dessert-drink.component';
import { KidsMealComponent } from './features/kids-meal/kids-meal.component';
import { CheckoutComponent } from './features/checkout/checkout.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent},
  { path: 'home', component: HomeComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'pizza', component: PizzaComponent },
  { path: 'burgers', component: BurgerComponent },
  { path: 'garlic-bread', component: GarlicBreadComponent },
  { path: 'side-orders', component: SideOrdersComponent },
  { path: 'desserts', component: DessertDrinkComponent, data: { mode: 'desserts'} },
  { path: 'drinks', component: DessertDrinkComponent, data: { mode: 'drinks'} },
  { path: 'kids-meal', component: KidsMealComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [ShopGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    { enableTracing: false, preloadingStrategy: SelectivePreloadingStrategyService }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }