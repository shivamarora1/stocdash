import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuickGlanceComponent } from './quick-glance/quick-glance.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuickGlanceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
