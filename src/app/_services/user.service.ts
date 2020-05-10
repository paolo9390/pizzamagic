import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, PizzaMagicUser } from '../_interfaces/user';
import { HttpClient } from '@angular/common/http';
import * as globals from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<PizzaMagicUser>;
  public currentUser: Observable<PizzaMagicUser>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<PizzaMagicUser>(JSON.parse(localStorage.getItem('pizzamagic-user')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): PizzaMagicUser {
     return this.currentUserSubject.value;
   }

   public setUserValue(user: PizzaMagicUser): void {
     this.currentUserSubject.next(user);
     localStorage.setItem('pizzamagic-user', JSON.stringify(user));
   }

   resetUser(): void {
     this.currentUserSubject.next(null);
     localStorage.removeItem('pizzamagic-user');
   }

   getUser(): Observable<User> {
    return this.http.get<User>(`${globals.HTTP_API_URL}/user/me`);
   }
}
