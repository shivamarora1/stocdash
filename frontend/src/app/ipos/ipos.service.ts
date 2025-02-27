import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActiveIpos } from './active-ipos/active-ipos.interface';

@Injectable({
  providedIn: 'root',
})
export class IposService {
  BASE_URL = environment.API_URL;
  constructor(private httpClient: HttpClient) {}

  getActiveIpos(): Observable<ActiveIpos> {
    return of([
      {
        name: 'XYZ Tech Ltd',
        symbol: 'XYZT',
        price: 150.75,
        lotPrice: 4522.5,
        openDate: new Date('2025-03-01'),
        closeDate: new Date('2025-03-05'),
        lotSize: 30,
        minimumInvestment: 4522.5,
        faceValue: 10,
        gmp: 75,
        suggestion: 'Strong Buy',
        review:
          'Promising IPO with strong fundamentals and high demand in the grey market.',
        listingDate: new Date('2025-03-12'),
        basisOfAllotment: new Date('2025-03-08'),
      },
    ]);
    // return this.httpClient.get<QuickGlanceOptions>(`${BASE_URL}/stocks/options`);
  }
}
