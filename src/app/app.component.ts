import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ColorSchemeService } from './core/services/color-scheme.service';

@Component({
  selector: 'pizza-magic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'pizzamagic';

  constructor(private colorSchemeService: ColorSchemeService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    
    this.colorSchemeService.load();
    this.iconRegistry.addSvgIcon(
      'chilli',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/chilli.svg')
    );
  }
}
