import { Injectable, Inject } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  private primaryTheme: string = 'theme';
  private darkTheme: string = 'dark-theme';

  constructor(@Inject(DOCUMENT) private document: Document,
    private overlayContainer: OverlayContainer) {
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
      this.document.body.classList.add('dark-primary-body');
      localStorage.setItem('pizzamagic-theme', 'dark');
      this.onThemeChange(this.darkTheme);
    }
    else {
      this.document.body.classList.remove('dark-primary-body');
      localStorage.removeItem('pizzamagic-theme');
      this.onThemeChange(this.primaryTheme);
    }
  }

  onThemeChange(theme: string) {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }
}
