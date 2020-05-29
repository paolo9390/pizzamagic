import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderModule } from './_shared/header/header.module';
import { FooterModule } from './_shared/footer/footer.module';
import { LoaderModule } from './_shared/loader/loader.module';
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    LoaderModule,
    HomeModule,
    AuthModule,
    UserModule,
    PizzaModule,
    GarlicBreadModule,
    BurgerModule,
    SideOrdersModule,
    DessertDrinkModule,
    KidsMealModule,
    CheckoutModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
