import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-pinned-ipos',
  imports: [SharedModule],
  templateUrl: './pinned-ipos.component.html',
  styleUrl: '../active-pinned-ipos.component.scss'
})
export class PinnedIposComponent implements OnInit {
  pinnedIpos: any = [];
  tableSize: any = 'small';
  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
