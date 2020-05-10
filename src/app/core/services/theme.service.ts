import { Injectable, Inject } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    const isDarkTheme: boolean = localStorage.getItem('pizzamagic-theme') ? true : false;
    this._darkTheme = new BehaviorSubject<boolean>(isDarkTheme);
    this.isDarkTheme = this._darkTheme.asObservable();
    this.setBodyCss(isDarkTheme);
  }

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
    this.setBodyCss(isDarkTheme);
  }

  setBodyCss(isDarkTheme) {
    if (isDarkTheme) {
      console.log(isDarkTheme);
      this.document.body.classList.add('dark-primary-body');
      localStorage.setItem('pizzamagic-theme', 'dark');
    }
    else {
      this.document.body.classList.remove('dark-primary-body');
      localStorage.removeItem('pizzamagic-theme');
    }
  }
}
