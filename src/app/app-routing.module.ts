import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './core/selective-preloading-strategy.service';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    { enableTracing: false, preloadingStrategy: SelectivePreloadingStrategyService }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }