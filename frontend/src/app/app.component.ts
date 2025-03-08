import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuickGlanceComponent } from './quick-glance/quick-glance.component';
import { ActivePinnedIposComponent } from './ipos/active-pinned-ipos/active-pinned-ipos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuickGlanceComponent, ActivePinnedIposComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
