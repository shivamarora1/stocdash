import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuickGlanceService } from './quick-glance.service';
import { QuickGlanceOptions } from './quick-glance.interface';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-quick-glance',
  imports: [CommonModule, CardModule],
  templateUrl: './quick-glance.component.html',
  styleUrl: './quick-glance.component.scss',
  providers: [QuickGlanceService],
})
export class QuickGlanceComponent implements OnInit, OnDestroy {
  availableOptions: QuickGlanceOptions = {};
  subscription!: Subscription;
  isLoading: boolean = true;
  constructor(private service: QuickGlanceService) {}
  ngOnInit(): void {
    this.subscription = interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => {
          return this.service.getOptions();
        })
      )
      .subscribe({
        next: (res) => {
          this.availableOptions = res;
          this.isLoading = false;
        },
        error: console.error,
      });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
