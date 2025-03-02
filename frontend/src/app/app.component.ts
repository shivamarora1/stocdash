import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuickGlanceComponent } from './quick-glance/quick-glance.component';
import { ActiveIposComponent } from './ipos/active-ipos/active-ipos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuickGlanceComponent, ActiveIposComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
