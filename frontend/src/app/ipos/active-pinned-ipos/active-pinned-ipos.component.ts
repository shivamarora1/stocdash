import { Component } from '@angular/core';
import { ActiveIposComponent } from './active-ipos/active-ipos.component';
import { PinnedIposComponent } from './pinned-ipos/pinned-ipos.component';
import { ActiveIpo } from './active-ipos/active-ipos.interface';

@Component({
  selector: 'app-active-pinned-ipos',
  imports: [ActiveIposComponent, PinnedIposComponent],
  templateUrl: './active-pinned-ipos.component.html'
})
export class ActivePinnedIposComponent {

  pinClicked(ipo: ActiveIpo){
    console.log(ipo);
  }
}
