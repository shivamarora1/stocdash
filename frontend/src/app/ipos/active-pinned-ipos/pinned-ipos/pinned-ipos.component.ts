import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { IposService } from '../../ipos.service';
import { CookieService } from 'ngx-cookie-service';
import { getPinIpoCookieName } from '../utils';
import { Subject } from 'rxjs';
import { ActiveIpo } from '../active-ipos/active-ipos.interface';

@Component({
  selector: 'app-pinned-ipos',
  imports: [SharedModule],
  providers: [IposService],
  templateUrl: './pinned-ipos.component.html',
  styleUrl: '../active-pinned-ipos.component.scss',
})
export class PinnedIposComponent implements OnInit {
  pinnedIpos: any = [];
  tableSize: any = 'small';
  isLoading: boolean = false;
  @Input('pinIpoSubject') pinIpoSubject: Subject<ActiveIpo> = new Subject();

  constructor(
    private ipoService: IposService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.pinIpoSubject.subscribe((e) => {
      this.pinnedIpos.push(e);
    });
    this.ipoService.getToBeListedIpos().subscribe((iposData) => {
      this.pinnedIpos = iposData.filter((ipo) =>
        this.cookieService.get(getPinIpoCookieName(ipo.symbol))
      );
    });
  }
  ngOnDestroy() {
    this.pinIpoSubject.unsubscribe();
  }
}
