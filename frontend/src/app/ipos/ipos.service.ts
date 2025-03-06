import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActiveIpos } from './active-pinned-ipos/active-ipos/active-ipos.interface';

@Injectable({
  providedIn: 'root',
})
export class IposService {
  BASE_URL = environment.API_URL;
  constructor(private httpClient: HttpClient) {}

  getActiveIpos(): Observable<ActiveIpos> {
    return this.httpClient.get<ActiveIpos>(`${this.BASE_URL}/ipos/active`);
  }
}
