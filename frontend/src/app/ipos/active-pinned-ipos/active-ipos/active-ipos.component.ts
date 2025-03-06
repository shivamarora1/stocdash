import { Component, OnInit } from '@angular/core';
import { IposService } from '../../ipos.service';
import { ActiveIpos } from './active-ipos.interface';
import { SharedModule } from '../../../shared.module';

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

  constructor(private iposService: IposService) {}

  ngOnInit(): void {
    this.iposService.getActiveIpos().subscribe((iposData) => {
      this.activeIpos = iposData;
      this.isLoading = false;
    });
  }
  onPinClick(ipoSymbol: string): void {
    console.log(ipoSymbol);
  }
}
