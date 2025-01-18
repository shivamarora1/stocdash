import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuickGlanceService {
  constructor(private httpClient: HttpClient) {}
  callFunc() {
    console.log('Call Func');
    this.httpClient
      .get('https://cdn.jsdelivr.net/gh/prebid/currency-file@1/latest.json')
      .subscribe((data) => console.log(data));
  }
}
