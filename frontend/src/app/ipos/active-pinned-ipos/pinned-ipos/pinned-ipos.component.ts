import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { IposService } from '../../ipos.service';
import { CookieService } from 'ngx-cookie-service';
import { getPinIpoCookieName } from '../utils';

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

  constructor(
    private ipoService: IposService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.ipoService.getToBeListedIpos().subscribe((iposData) => {
      this.pinnedIpos = iposData.filter((ipo) =>
        this.cookieService.get(getPinIpoCookieName(ipo.symbol))
      );
    });
  }
}
