import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './_shared/header/header.module';
import { FooterModule } from './_shared/footer/footer.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { LoaderService } from './_services/loader.service';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { PizzaModule } from './features/pizza/pizza.module';
import { GarlicBreadModule } from './features/garlic-bread/garlic-bread.module';
import { BurgerModule } from './features/burger/burger.module';
import { SideOrdersModule } from './features/side-orders/side-orders.module';
import { DessertDrinkModule } from './features/dessert-drink/dessert-drink.module';
import { KidsMealModule } from './features/kids-meal/kids-meal.module';
import { CheckoutModule } from './features/checkout/checkout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    AuthModule,
    UserModule,
    PizzaModule,
    GarlicBreadModule,
    BurgerModule,
    SideOrdersModule,
    DessertDrinkModule,
    KidsMealModule,
    CheckoutModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('dark-theme');
  }
}
