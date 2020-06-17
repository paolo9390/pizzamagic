import { Component, ViewEncapsulation, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ColorSchemeService } from './core/services/color-scheme.service';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from './_services/loader.service';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'pizza-magic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
  title = 'pizzamagic';
  loading$: Subscription;
  loading: boolean;
  routerSubscription: Subscription;

  constructor(private colorSchemeService: ColorSchemeService,
    private loaderService: LoaderService,
    public router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platform: Object) {

    this.loading$ = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
        this.loading = state.show;
    });
    
    this.colorSchemeService.load();
    this.iconRegistry.addSvgIcon(
      'chilli',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/chilli.svg')
    );

    // not render in ssr
    if (isPlatformBrowser(this.platform)) {
      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)).subscribe(
          () => window.scrollTo(0, 0)
        );
    }
  }

  ngOnDestroy() {
    if (this.loading$){
      this.loading$.unsubscribe();
    }
    if (this.routerSubscription){
      this.routerSubscription.unsubscribe();
    }
  }
}
