import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { QuickGlanceOptions } from './quick-glance.interface'
@Injectable({
  providedIn: 'root',
})
export class QuickGlanceService {
  BASE_URL = environment.API_URL;
  constructor(private httpClient: HttpClient) { }
  getOptions(): Observable<QuickGlanceOptions> {
    return this.httpClient.get<QuickGlanceOptions>(`${environment.API_URL}/stocks/options`);
  }
}
