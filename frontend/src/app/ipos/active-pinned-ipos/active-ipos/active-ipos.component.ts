import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IposService } from '../../ipos.service';
import { ActiveIpo, ActiveIpos } from './active-ipos.interface';
import { SharedModule } from '../../../shared.module';
import { CookieService } from 'ngx-cookie-service';
import { getPinIpoCookieName } from '../utils';

@Component({
  selector: 'app-active-ipos',
  imports: [SharedModule],
  providers: [IposService],
  templateUrl: './active-ipos.component.html',
  styleUrl: '../active-pinned-ipos.component.scss',
})
export class ActiveIposComponent implements OnInit {
  activeIpos: ActiveIpos = [];
  tableSize: any = 'small';
  isLoading: boolean = true;
  @Output() pinClicked = new EventEmitter<ActiveIpo>();

  constructor(
    private iposService: IposService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.iposService.getActiveIpos().subscribe((iposData) => {
      this.activeIpos = iposData.filter(
        (ipo) => !this.cookieService.get(getPinIpoCookieName(ipo.symbol))
      );
      this.isLoading = false;
    });
  }
  onPinClick(ipoSymbol: string): void {
    // * Setting cookie for pinned ipos.
    // * Later we can store this in database.

    const pinnedIpo = this.activeIpos.find((i) => i.symbol === ipoSymbol);
    if (pinnedIpo) {

      const listingDate = new Date(pinnedIpo.listingDate);
      listingDate.setDate(listingDate.getDate() + 1);
      this.cookieService.set(
        getPinIpoCookieName(ipoSymbol),
        'true',
        listingDate
      );
      this.activeIpos = this.activeIpos.filter((e) => e.symbol !== ipoSymbol);
      this.pinClicked.emit(pinnedIpo);
    }
  }
}
