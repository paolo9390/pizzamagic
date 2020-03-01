import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
    this.setBodyCss(isDarkTheme);
  }

  setBodyCss(isDarkTheme) {
    if (isDarkTheme) {
      console.log(isDarkTheme);
      this.document.body.classList.add('dark-primary-body');
    }
    else {
      this.document.body.classList.remove('dark-primary-body');
    }
  }
}
