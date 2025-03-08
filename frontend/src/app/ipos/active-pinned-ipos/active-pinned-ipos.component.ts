import { Component } from '@angular/core';
import { ActiveIposComponent } from './active-ipos/active-ipos.component';
import { PinnedIposComponent } from './pinned-ipos/pinned-ipos.component';
import { ActiveIpo } from './active-ipos/active-ipos.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-active-pinned-ipos',
  imports: [ActiveIposComponent, PinnedIposComponent],
  templateUrl: './active-pinned-ipos.component.html',
})
export class ActivePinnedIposComponent {
  pinIpoSubject: Subject<ActiveIpo> = new Subject();

  pinClicked(ipo: ActiveIpo) {
    this.pinIpoSubject.next(ipo);
  }
}
