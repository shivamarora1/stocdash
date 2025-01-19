import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { QuickGlanceService } from './quick-glance.service';
import { QuickGlanceOptions } from './quick-glance.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quick-glance',
  standalone: true,
  imports: [ContainerComponent, CommonModule],
  templateUrl: './quick-glance.component.html',
  styleUrl: './quick-glance.component.scss',
  providers: [QuickGlanceService],
})
export class QuickGlanceComponent implements OnInit {
  availableOptions: QuickGlanceOptions = {};
  constructor(private service: QuickGlanceService) {}
  ngOnInit(): void {
    this.service.getOptions().subscribe((res) => {
      this.availableOptions = res;
      console.log(this.availableOptions);
    });
  }
}
