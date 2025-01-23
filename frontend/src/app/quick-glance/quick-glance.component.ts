import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { QuickGlanceService } from './quick-glance.service';
import { QuickGlanceOptions } from './quick-glance.interface';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-quick-glance',
  standalone: true,
  imports: [ContainerComponent, CommonModule],
  templateUrl: './quick-glance.component.html',
  styleUrl: './quick-glance.component.scss',
  providers: [QuickGlanceService],
})
export class QuickGlanceComponent implements OnInit, OnDestroy {
  availableOptions: QuickGlanceOptions = {};
  subscription!: Subscription;
  isLoading: boolean = false;
  constructor(private service: QuickGlanceService) {}
  ngOnInit(): void {
    this.subscription = interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => {
          this.isLoading = true;
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
