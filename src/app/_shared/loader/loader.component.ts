import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from '../../_services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  loading$: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loading$ = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
        this.show = state.show;
    });
  }
  
  ngOnDestroy() {
    if (this.loading$) this.loading$.unsubscribe();
  }
}
