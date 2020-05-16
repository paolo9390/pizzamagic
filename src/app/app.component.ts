import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pizza-magic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'pizzamagic';
  isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    this.isDarkTheme = this.themeService.isDarkTheme;

    this.iconRegistry.addSvgIcon(
      'chilli',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/chilli.svg')
    );
  }
}
