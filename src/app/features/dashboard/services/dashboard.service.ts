import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import { AppConfig } from 'src/config/app.config';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  endpoint: any;
  appConfig: AppConfig;

  constructor(private readonly http: HttpClient) {
    this.endpoint = AppConfig.getConfig();
  }

  getFeedbackStatistics(): Observable<any> {
    return this.http.get<any>(this.endpoint.api.getFeedbackStatistics);
  }
}
