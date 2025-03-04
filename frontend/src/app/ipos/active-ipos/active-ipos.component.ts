import { Component, OnInit } from '@angular/core';
import { IposService } from '../ipos.service';
import { TableModule } from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActiveIpos } from './active-ipos.interface';
import { Tooltip } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-active-ipos',
  imports: [CommonModule, TableModule, TagModule, Tooltip, CurrencyPipe],
  providers: [IposService],
  templateUrl: './active-ipos.component.html',
  styleUrl: './active-ipos.component.scss',
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
}
