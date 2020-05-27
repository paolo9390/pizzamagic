import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ColorSchemeService } from './core/services/color-scheme.service';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from './_services/loader.service';

@Component({
  selector: 'pizza-magic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
  title = 'pizzamagic';
  loadingSubscription: Subscription;
  loading: boolean;

  constructor(private colorSchemeService: ColorSchemeService,
    private loaderService: LoaderService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {

    this.loadingSubscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
        this.loading = state.show;
    });
    
    this.colorSchemeService.load();
    this.iconRegistry.addSvgIcon(
      'chilli',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/chilli.svg')
    );
  }

  ngOnDestroy() {
    if (this.loadingSubscription){
      this.loadingSubscription.unsubscribe();
    }
  }
}
