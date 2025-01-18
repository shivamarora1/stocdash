import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { QuickGlanceService } from './quick-glance.service';

@Component({
  selector: 'app-quick-glance',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './quick-glance.component.html',
  styleUrl: './quick-glance.component.scss',
  providers: [QuickGlanceService],
})
export class QuickGlanceComponent implements OnInit{
  constructor(private service: QuickGlanceService) { }
  ngOnInit(): void {
      this.service.callFunc()
  }
}
