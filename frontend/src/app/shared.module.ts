import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { CurrencyPipe } from '@angular/common';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  imports: [CommonModule, TableModule, TagModule, Tooltip],
  exports: [CommonModule, TableModule, TagModule, Tooltip, CurrencyPipe],
  providers: [CurrencyPipe,CookieService],
})
export class SharedModule {}
